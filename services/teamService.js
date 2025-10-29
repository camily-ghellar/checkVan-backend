import { PrismaClient } from "@prisma/client";
import { generateRoute } from "./geocodingService.js";

const prisma = new PrismaClient();

/**
 * Recalcula as rotas de ida e volta da turma
 * @param teamId - ID da turma
 * @param shift - turno: 'morning' | 'afternoon'
 * @param startingLat - latitude inicial
 * @param startingLon - longitude inicial
 */

export async function recalculateTeamRoutes(teamId, shift, startingLat, startingLon) {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      school: true,
      student_team: { include: { student: true } },
      van: true
    }
  });

  if (!team) throw new Error("Turma não encontrada.");

  const school = team.school;
  if (!school.latitude || !school.longitude)
    throw new Error("A escola não possui coordenadas.");

  const startLat = startingLat ?? team.starting_lat ?? team.van?.latitude;
  const startLon = startingLon ?? team.starting_lon ?? team.van?.longitude;
  if (!startLat || !startLon)
    throw new Error("Coordenadas iniciais ausentes.");

  if (!shift) shift = team.shift;
  if (!shift) throw new Error("Turno não definido.");

  const studentsGoing = team.student_team
    .map(st => ({ lat: st.student.latitude, lon: st.student.longitude }))
    .filter(s => s.lat && s.lon);

  const boardingMarginPerChild = 2; // minutos por criança
  const totalMarginMinutes = studentsGoing.length * boardingMarginPerChild;

  const schoolStartStr = shift === "morning" ? school.morning_limit : school.afternoon_limit;
  const schoolEndStr = shift === "morning" ? school.morning_departure : school.afternoon_departure;
  if (!schoolStartStr || !schoolEndStr)
    throw new Error("A escola não possui horários para o turno informado.");

  const schoolStart = new Date(`1970-01-01T${schoolStartStr}:00`);
  const schoolEnd = new Date(`1970-01-01T${schoolEndStr}:00`);

  //ida
  const routeGoing = await generateRoute({ lat: startLat, lon: startLon }, studentsGoing, {
    lat: school.latitude,
    lon: school.longitude
  });

  const legsGoing = routeGoing.legs || routeGoing.routes?.[0]?.legs;
  const totalMinutesGoing = Math.ceil(
    (legsGoing?.reduce((sum, leg) => sum + (leg.duration_in_traffic?.value || leg.duration?.value || 0), 0) || 0) / 60
  ) + totalMarginMinutes;

  const departure_time_going = new Date(schoolStart.getTime() - totalMinutesGoing * 60000);
  const arrival_time_going = schoolStart;

  //volta
  const routeReturn = await generateRoute(
    { lat: school.latitude, lon: school.longitude },
    studentsGoing.reverse(),
    { lat: startLat, lon: startLon }
  );

  const legsReturn = routeReturn.legs || routeReturn.routes?.[0]?.legs;
  const totalMinutesReturn = Math.ceil(
    (legsReturn?.reduce((sum, leg) => sum + (leg.duration_in_traffic?.value || leg.duration?.value || 0), 0) || 0) / 60
  ) + totalMarginMinutes;

  const departure_time_return = schoolEnd;
  const arrival_time_return = new Date(schoolEnd.getTime() + totalMinutesReturn * 60000);

  const updatedTeam = await prisma.team.update({
    where: { id: teamId },
    data: {
      shift,
      departure_time_going,
      arrival_time_going,
      duration_going: totalMinutesGoing,
      departure_time_return,
      arrival_time_return,
      duration_return: totalMinutesReturn,
      distance_total: (routeGoing.distance?.value ?? 0) / 1000
    }
  });

  return updatedTeam;
}

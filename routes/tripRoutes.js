import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireDriver } from '../middlewares/roles.js';
import { getRealTimeEta } from '../services/geocodingService.js';
import { getDistance } from 'geolib'
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.get('/next-trips', authenticateToken, requireDriver, async (req, res) => {
  try {
    const driverId = req.user.id;
    const now = new Date();

    const teams = await prisma.team.findMany({
      where: {
        driver_id: driverId,
      },
      include: {
        student_team: true,
        school: true
      },
    });

    if (!teams.length) {
      return res.status(200).json({ message: 'Nenhuma viagem futura encontrada.', trips: [] });
    }

    const formattedTrips = [];

    teams.forEach(team => {
      const nowMs = now.getTime();
      const teamTrips = [];

      if (team.departure_time_going) {
        const startTime = new Date(team.departure_time_going);

        // A rota é válida se:
        // A) A data de partida (startTime) é igual ou posterior à data atual (hoje).
        // B) Se a rota é para hoje (mesmo dia), a hora de partida ainda não pode ter passado.
        
        if (startTime > now) {
            const diffMinutes = Math.round((startTime.getTime() - nowMs) / 60000);

            let startsIn;
            if (diffMinutes < 1) startsIn = 'Agora';
            else if (diffMinutes < 60) startsIn = `Em ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
            else startsIn = `Em ${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}min`;

            teamTrips.push({
              teamId: team.id, 
              tipo: 'Ida',
              rota: team.name,
              escola: team.school.name,
              quantidade_alunos: team.student_team.length,
              horario_inicio: startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              comeca_em: startsIn,
              sortTime: startTime.getTime(), 
            });
        }
      }

      if (team.departure_time_return) {
        const startTime = new Date(team.departure_time_return);

        if (startTime > now) {
            const diffMinutes = Math.round((startTime.getTime() - nowMs) / 60000);

            let startsIn;
            if (diffMinutes < 1) startsIn = 'Agora';
            else if (diffMinutes < 60) startsIn = `Em ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
            else startsIn = `Em ${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}min`;

            teamTrips.push({
              teamId: team.id, 
              tipo: 'Volta',
              rota: team.name,
              escola: team.school.name,
              quantidade_alunos: team.student_team.length,
              horario_inicio: startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              comeca_em: startsIn,
              sortTime: startTime.getTime(), 
            });
        }
      }
      
      formattedTrips.push(...teamTrips);
    });
    
    formattedTrips.sort((a, b) => a.sortTime - b.sortTime);

    const finalTrips = formattedTrips.map(trip => {
      const { sortTime, ...rest } = trip;
      return rest;
    });

    if (finalTrips.length === 0) {
       return res.status(200).json({ message: 'Nenhuma viagem futura encontrada.', trips: [] });
    }

    res.status(200).json({ trips: finalTrips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar próximas viagens.', error: err.message });
  }
});

router.post('/calculate-route-etas', authenticateToken, async (req, res) => {
  const { currentLat, currentLon, remainingStudentIds, teamId } = req.body;

  if (!currentLat || !currentLon || !teamId) {
    return res.status(400).json({ message: 'Dados insuficientes.' });
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id: Number(teamId) },
      include: { school: true }
    });

    if (!team) return res.status(404).json({ message: 'Turma não encontrada.' });

    let nextStopMinutes = 0;
    let totalMinutesToSchool = 0;
    const STOP_PENALTY_MINUTES = 5;
    const AVERAGE_SPEED_KMH = 30; 

    if (!remainingStudentIds || remainingStudentIds.length === 0) {
      const minutes = await getRealTimeEta(currentLat, currentLon, team.school.latitude, team.school.longitude);
      return res.json({
        nextStopEta: null,
        schoolEta: minutes || 0
      });
    }

    const students = await prisma.student.findMany({
      where: { id: { in: remainingStudentIds } },
      select: { id: true, latitude: true, longitude: true }
    });

    const sortedStudents = remainingStudentIds
      .map(id => students.find(s => s.id === id))
      .filter(s => s !== undefined); 

    if (sortedStudents.length === 0) return res.json({ nextStopEta: 0, schoolEta: 0 });

    const nextStudent = sortedStudents[0];
    const realTimeMinutes = await getRealTimeEta(currentLat, currentLon, nextStudent.latitude, nextStudent.longitude);
    
    nextStopMinutes = realTimeMinutes !== null 
      ? realTimeMinutes 
      : calculateLocalEta({ lat: currentLat, lon: currentLon }, { lat: nextStudent.latitude, lon: nextStudent.longitude }, AVERAGE_SPEED_KMH);

    totalMinutesToSchool = nextStopMinutes;

    let previousLocation = { lat: nextStudent.latitude, lon: nextStudent.longitude };

    for (let i = 1; i < sortedStudents.length; i++) {
      const student = sortedStudents[i];
      const currentLocation = { lat: student.latitude, lon: student.longitude };
      
      totalMinutesToSchool += calculateLocalEta(previousLocation, currentLocation, AVERAGE_SPEED_KMH);
      previousLocation = currentLocation;
    }

    const schoolLocation = { lat: team.school.latitude, lon: team.school.longitude };
    totalMinutesToSchool += calculateLocalEta(previousLocation, schoolLocation, AVERAGE_SPEED_KMH);

    const totalStopPenalties = sortedStudents.length * STOP_PENALTY_MINUTES;
    totalMinutesToSchool += totalStopPenalties;

    res.json({
      nextStopEta: nextStopMinutes,
      schoolEta: Math.ceil(totalMinutesToSchool)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao calcular ETA composto.' });
  }
});

function calculateLocalEta(start, end, speedKmh) {
  if (!start.lat || !end.lat) return 0;
  
  const distMeters = getDistance(
    { latitude: start.lat, longitude: start.lon },
    { latitude: end.lat, longitude: end.lon }
  );
  
  const speedMetersPerMin = (speedKmh * 1000) / 60;
  return Math.ceil((distMeters / speedMetersPerMin) + 2); // +2 min margem
}

export default router;

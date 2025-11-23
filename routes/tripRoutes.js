import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireDriver } from '../middlewares/roles.js';
import { getRealTimeEta } from '../services/geocodingService.js';
import { getDistance } from 'geolib'
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

const getDateOnlyUTC = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

const getTodayTripTime = (dateObject, todayUTC) => {
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    
    const tripTimeTodayUTC = new Date(todayUTC);
    tripTimeTodayUTC.setUTCHours(hours, minutes, 0, 0);
    return tripTimeTodayUTC;
}

router.get('/next-trips', authenticateToken, requireDriver, async (req, res) => {
  try {
    const driverId = req.user.id;
    const now = new Date();
    
    const todayUTC = getDateOnlyUTC(now); 

    const teams = await prisma.team.findMany({
      where: { driver_id: driverId },
      include: {
        student_team: true,
        school: true
      },
    });

    if (!teams.length) {
      return res.status(200).json({ message: 'Nenhuma viagem futura encontrada.', trips: [] });
    }

    const formattedTrips = [];
    const nowMs = now.getTime();

    teams.forEach(team => {
      
      const processTrip = (tripBaseDate, type, durationVal) => {
        if (!tripBaseDate) return;

        const dateOfVigency = new Date(tripBaseDate);
        const startDateOnlyUTC = getDateOnlyUTC(dateOfVigency);
        
        if (startDateOnlyUTC <= todayUTC) {
            
            let targetTime = getTodayTripTime(dateOfVigency, todayUTC);
            let isTomorrow = false;

            let durationMinutes = durationVal || 90;
            
            if (durationMinutes < 10) durationMinutes = 60; 

            const expirationTime = targetTime.getTime() + (durationMinutes * 60000);

            if (nowMs > expirationTime) {
                targetTime = new Date(targetTime.getTime() + 86400000);
                isTomorrow = true;
            }

            const diffMinutes = Math.round((targetTime.getTime() - nowMs) / 60000);
            
            let startsIn;
            if (diffMinutes < -10) startsIn = 'Atrasada / Em rota';
            else if (diffMinutes <= 0) startsIn = 'Agora';
            else if (diffMinutes < 60) startsIn = `Em ${diffMinutes} min`;
            else startsIn = `Em ${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}min`;
          

            formattedTrips.push({
                teamId: team.id, 
                tipo: type,
                rota: team.name,
                escola: team.school.name,
                quantidade_alunos: team.student_team.length,
                horario_inicio: targetTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                comeca_em: startsIn,
                sortTime: targetTime.getTime(), 
                isTomorrow: isTomorrow, 
                status: isTomorrow ? 'FUTURE' : (diffMinutes <= 0 ? 'ONGOING' : 'PENDING')
            });
        }
      };

      processTrip(team.departure_time_going, 'Ida', team.duration_going);
      processTrip(team.departure_time_return, 'Volta', team.duration_return);
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
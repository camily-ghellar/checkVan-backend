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

    const trips = await prisma.team.findMany({
      where: {
        driver_id: driverId,
        OR: [
          { departure_time_going: { gte: now } },
          { departure_time_return: { gte: now } }
        ],
      },
      include: {
        student_team: true,
        school: true
      },
      orderBy: [
        { departure_time_going: 'asc' },
        { departure_time_return: 'asc' }
      ]
    });

    if (!trips.length) {
      return res.status(200).json({ message: 'Nenhuma viagem futura encontrada.', trips: [] });
    }

    const formattedTrips = trips.map(trip => {
      const nowMs = now.getTime();
      const tripsData = [];

      if (trip.departure_time_going && trip.departure_time_going > now) {
        const startTime = new Date(trip.departure_time_going);
        const diffMinutes = Math.round((startTime.getTime() - nowMs) / 60000);

        let startsIn;
        if (diffMinutes < 1) startsIn = 'Agora';
        else if (diffMinutes < 60) startsIn = `Em ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
        else startsIn = `Em ${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}min`;

        tripsData.push({
          teamId: trip.id, 
          tipo: 'Ida',
          rota: trip.name,
          escola: trip.school.name,
          quantidade_alunos: trip.student_team.length,
          horario_inicio: startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          comeca_em: startsIn,
        });
      }

      if (trip.departure_time_return && trip.departure_time_return > now) {
        const startTime = new Date(trip.departure_time_return);
        const diffMinutes = Math.round((startTime.getTime() - nowMs) / 60000);

        let startsIn;
        if (diffMinutes < 1) startsIn = 'Agora';
        else if (diffMinutes < 60) startsIn = `Em ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
        else startsIn = `Em ${Math.floor(diffMinutes / 60)}h ${diffMinutes % 60}min`;

        tripsData.push({
          teamId: trip.id, 
          tipo: 'Volta',
          rota: trip.name,
          escola: trip.school.name,
          quantidade_alunos: trip.student_team.length,
          horario_inicio: startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          comeca_em: startsIn,
        });
      }

      return tripsData;
    }).flat();
    
    formattedTrips.sort((a, b) => {
        const aDiff = a.comeca_em.startsWith('Agora') ? 0 : (a.comeca_em.includes('h') ? parseInt(a.comeca_em.split('h')[0].replace('Em ', '')) * 60 : parseInt(a.comeca_em.split(' ')[1]));
        const bDiff = b.comeca_em.startsWith('Agora') ? 0 : (b.comeca_em.includes('h') ? parseInt(b.comeca_em.split('h')[0].replace('Em ', '')) * 60 : parseInt(b.comeca_em.split(' ')[1]));
        return aDiff - bDiff;
    });

    res.status(200).json({ trips: formattedTrips });
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

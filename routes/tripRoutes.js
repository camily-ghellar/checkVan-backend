import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from '../middlewares/roles.js';

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

    res.status(200).json({ trips: formattedTrips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar próximas viagens.', error: err.message });
  }
});

export default router;

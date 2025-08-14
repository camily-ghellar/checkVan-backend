import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/registration', authenticateToken, async (req, res) => {
  const { departure_time, arrival_time, starting_point, ending_point } = req.body;

  try {
    const departureDateObject = new Date(`1970-01-01T${departure_time}:00`);
    const arrivalDateObject = new Date(`1970-01-01T${arrival_time}:00`);

    const trip = await prisma.trip.create({
      data: {
        departure_time: departureDateObject,
        arrival_time: arrivalDateObject,
        starting_point,
        ending_point
      }
    });

    res.status(201).json({ message: 'Viagem cadastrada com sucesso.', trip });
  } catch (error) {
    console.log({ message: 'Erro ao cadastrar viagem', error: error.message });
    res.status(500).json({ message: 'Erro ao cadastrar viagem', error: error.message });
  }
});

router.get('/getAll', authenticateToken, async (req, res) => {
  try {
    const tripsFromDb = await prisma.trip.findMany({
      orderBy: { departure_time: 'asc' },
      select: {
        id: true,
        departure_time: true,
        arrival_time: true,
        starting_point: true,
        ending_point: true
      }
    });

    const formatTime = (date) => {
      if (!date) return null;
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const formattedTrips = tripsFromDb.map(trip => ({
      id: trip.id,
      starting_point: trip.starting_point,
      ending_point: trip.ending_point,
      departure_time: formatTime(trip.departure_time),
      arrival_time: formatTime(trip.arrival_time)
    }));

    res.status(200).json({ trips: formattedTrips });

  } catch (error) {
    console.log({ message: 'Erro ao buscar viagens', error: error.message });
    res.status(500).json({ message: 'Erro ao buscar viagens', error: error.message });
  }
});

router.get('/getBytripId/:tripId', authenticateToken, async (req, res) => {
  const tripId = parseInt(req.params.tripId, 10);
  if (isNaN(tripId)) {
    return res.status(400).json({ message: 'O ID da viagem é inválido.' });
  }

  try {
    const teams = await prisma.team.findMany({
      where: { trip_id: tripId }
    });
    if (!teams) {
      return res.status(404).json({ message: 'Nenhuma turma encontrada.' });
    }

    res.json({ teams });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados da turma.', error: err.message });
  }
});


router.put('/update', authenticateToken, async (req, res) => {
  const { id, departure_time, arrival_time, starting_point, ending_point } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'O ID da viagem é obrigatório para atualização.' });
  }

  try {
    const dataToUpdate = {};
    if (departure_time) {
      dataToUpdate.departure_time = new Date(`1970-01-01T${departure_time}:00`);
    }
    if (arrival_time) {
      dataToUpdate.arrival_time = new Date(`1970-01-01T${arrival_time}:00`);
    }
    if (starting_point) {
      dataToUpdate.starting_point = starting_point;
    }
    if (ending_point) {
      dataToUpdate.ending_point = ending_point;
    }

    const updatedTrip = await prisma.trip.update({
      where: {
        id: parseInt(id, 10) 
      },
      data: dataToUpdate 
    });

    res.status(200).json({ message: 'Viagem atualizada com sucesso.', trip: updatedTrip });

  } catch (error) {
    console.log({ message: 'Erro ao atualizar viagem', error: error.message });
    res.status(500).json({ message: 'Erro ao atualizar viagem', error: error.message });
  }
});

router.delete('/delete', authenticateToken, async (req, res) => {
  const { id } = req.body; 

  if (!id) {
    return res.status(400).json({ message: 'O ID da viagem é obrigatório.' });
  }

  try {
    const tripExists = await prisma.trip.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!tripExists) {
      return res.status(404).json({ message: 'Viagem não encontrada.' });
    }

    await prisma.trip.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({ message: 'Viagem deletada com sucesso.' });
  } catch (error) {
    console.log({ message: 'Erro ao deletar viagem', error: error.message });
    res.status(500).json({ message: 'Erro ao deletar viagem', error: error.message });
  }
});


export default router;
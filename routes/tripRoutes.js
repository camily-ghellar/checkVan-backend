import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { addressToCoords } from '../services/geocodingService.js';


const router = Router();
const prisma = new PrismaClient();

router.post('/registration', authenticateToken, async (req, res) => {
  const { departure_time, arrival_time, starting_point, school_id } = req.body;

  try {
    const school = await prisma.school.findUnique({ where: { id: Number(school_id) } });
    if (!school) {
      return res.status(404).json({ message: 'Escola não encontrada.' });
    }

    const startCoords = starting_point ? await addressToCoords(starting_point) : null;

    const trip = await prisma.trip.create({
      data: {
        departure_time: departure_time ? new Date(departure_time) : null,
        arrival_time: arrival_time ? new Date(arrival_time) : null,
        starting_point,
        starting_lat: startCoords?.lat ? parseFloat(startCoords.lat) : null,
        starting_lon: startCoords?.lon ? parseFloat(startCoords.lon) : null,
        school_id: Number(school_id)
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
      include: {
        school: true, 
      }
    });

    const formatTime = (date) => { /* ... sua função formatTime ... */ };

    const formattedTrips = tripsFromDb.map(trip => ({
      id: trip.id,
      starting_point: trip.starting_point,
      departure_time: formatTime(trip.departure_time),
      arrival_time: formatTime(trip.arrival_time),
      school: trip.school ? { id: trip.school.id, name: trip.school.name } : null
    }));

    res.status(200).json({ trips: formattedTrips });
  } catch (error) {
    // ...
  }
});

router.get('/getBytripId/:tripId', authenticateToken, async (req, res) => {
  const tripId = parseInt(req.params.tripId, 10);

  if (isNaN(tripId)) {
    return res.status(400).json({ message: 'O ID da viagem é inválido.' });
  }

  try {
    const teams = await prisma.team.findMany({
      where: { trip_id: tripId },
      include: {
        trip: true
      }
    });
    
    res.json({ teams });

  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados da turma.', error: err.message });
  }
});


router.put('/update', authenticateToken, async (req, res) => {
  const { id, departure_time, arrival_time, starting_point, school_id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'O ID da viagem é obrigatório.' });
  }

  try {
    const dataToUpdate = {};
    if (departure_time) dataToUpdate.departure_time = new Date(`1970-01-01T${departure_time}:00`);
    if (arrival_time) dataToUpdate.arrival_time = new Date(`1970-01-01T${arrival_time}:00`);
    if (starting_point) dataToUpdate.starting_point = starting_point;
    if (school_id) dataToUpdate.school_id = Number(school_id);

    const updatedTrip = await prisma.trip.update({
      where: { id: parseInt(id, 10) },
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
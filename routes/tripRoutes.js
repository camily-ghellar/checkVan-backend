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
    res.status(500).json({ message: 'Erro ao cadastrar viagem.', error: error.message });
  }
});

export default router;

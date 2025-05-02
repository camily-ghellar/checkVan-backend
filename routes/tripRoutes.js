import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/registration', authenticateToken, async (req, res) => {
  const { departure_time, arrival_time } = req.body;

  try {
    const trip = await prisma.trip.create({
      data: {
        departure_time,
        arrival_time
      }
    });

    res.status(201).json({ message: 'Viagem cadastrada com sucesso', trip });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar viagem', error: error.message });
  }
});

export default router;

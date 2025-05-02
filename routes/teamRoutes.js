import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/registration', authenticateToken, async (req, res) => {
  const { name, trip_id } = req.body;
  const driver_id = req.user.id;

  try {
    const team = await prisma.team.create({
      data: {
        name,
        driver_id,
        trip_id
      }
    });

    res.status(201).json({ message: 'Turma cadastrada com sucesso', team });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar turma', error: error.message });
  }
});

export default router;

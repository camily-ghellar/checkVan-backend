import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/registration', authenticateToken, async (req, res) => {
  const { name, birth_date } = req.body;

  try {
    const student = await prisma.student.create({
      data: {
        name,
        birth_date: new Date(birth_date),
        guardian_id: req.user.id
      }
    });

    res.status(201).json({ message: 'Estudante cadastrado com sucesso.', student });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar estudante.', error: error.message });
  }
});

export default router;

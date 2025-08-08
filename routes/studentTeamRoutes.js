import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/assignStudentToTeam', authenticateToken, async (req, res) => {
  const { student_id, team_id } = req.body;

  try {
    await prisma.student_team.create({
      data: { student_id, team_id }
    });

    res.json({ message: 'Estudante atribuído à equipe com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atribuir estudante à equipe.', error: err.message });
  }
});

export default router;

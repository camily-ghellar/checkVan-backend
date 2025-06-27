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

router.get('/:teamId/students', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const teamId = Number(req.params.teamId);

  if (Number.isNaN(teamId)) {
    return res.status(400).json({ message: 'ID da turma inválido.' });
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { driver_id: true }
    });
    if (!team || team.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado à turma.' });
    }

    const studentTeams = await prisma.student_team.findMany({
      where: { team_id: teamId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            birth_date: true,
            gender: true,
            user: { 
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    const students = studentTeams.map(st => ({
      id: st.student.id,
      name: st.student.name,
      birth_date: st.student.birth_date,
      gender: st.student.gender,
      guardian: {
        id: st.student.user.id,
        name: st.student.user.name
      }
    }));

    res.json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar estudantes.', error: error.message });
  }
});


export default router;

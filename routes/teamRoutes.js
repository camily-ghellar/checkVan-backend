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

    res.status(201).json({ message: 'Turma cadastrada com sucesso.', team });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar turma.', error: error.message });
  }
});


router.get('/getAllByDriver', authenticateToken, async (req, res) => {
  const driverId = req.user.id;

  try {
    const teams = await prisma.team.findMany({
      where: { driver_id: driverId },
      include: {
        trip: true,
        student_team: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                birth_date: true,
                gender: true,
                user: { select: { id: true, name: true } }
              }
            }
          }
        }
      }
    });

    const formatted = teams.map(team => ({
      id: team.id,
      name: team.name,
      trip: {
        id: team.trip.id,
        starting_point: team.trip.starting_point,
        ending_point: team.trip.ending_point,
        departure_time: team.trip.departure_time,
        arrival_time: team.trip.arrival_time
      },
      students: team.student_team.map(st => ({
        id: st.student.id,
        name: st.student.name,
        birth_date: st.student.birth_date,
        gender: st.student.gender,
        guardian: {
          id: st.student.user.id,
          name: st.student.user.name
        }
      }))
    }));

    res.json({ teams: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar turmas.', error: err.message });
  }
});


router.get('/getAll', authenticateToken, async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        driver: { 
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        trip: true, 
        student_team: { 
          include: {
            student: {
              select: {
                id: true,
                name: true,
                birth_date: true,
                gender: true,
                user: { select: { id: true, name: true } }
              }
            }
          }
        }
      }
    });

    const formatted = teams.map(team => ({
      id: team.id,
      name: team.name,
      driver: {
        id: team.driver.id,
        name: team.driver.name,
        email: team.driver.email,
        phone: team.driver.phone
      },
      trip: {
        id: team.trip.id,
        starting_point: team.trip.starting_point,
        ending_point: team.trip.ending_point,
        departure_time: team.trip.departure_time,
        arrival_time: team.trip.arrival_time
      },
      students: team.student_team.map(st => ({
        id: st.student.id,
        name: st.student.name,
        birth_date: st.student.birth_date,
        gender: st.student.gender,
        guardian: {
          id: st.student.user.id,
          name: st.student.user.name
        }
      }))
    }));

    res.json({ teams: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar turmas.', error: err.message });
  }
});


router.get('getTeam/:teamId', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const teamId = Number(req.params.teamId);

  if (Number.isNaN(teamId)) {
    return res.status(400).json({ message: 'ID da turma inválido.' });
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        trip: true
      }
    });

    if (!team) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    if (team.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado à turma.' });
    }

    res.json({ team });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar turma.', error: error.message });
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


router.put('update/:teamId', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const teamId = Number(req.params.teamId);
  const { name, trip_id } = req.body;

  if (Number.isNaN(teamId)) {
    return res.status(400).json({ message: 'ID da turma inválido.' });
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { driver_id: true }
    });

    if (!team) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    if (team.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado à turma.' });
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        ...(name && { name }),
        ...(trip_id && { trip_id })
      }
    });

    res.json({ message: 'Turma atualizada com sucesso.', team: updatedTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar turma.', error: error.message });
  }
});


router.delete('delete/:teamId', authenticateToken, async (req, res) => {
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

    if (!team) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    if (team.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado à turma.' });
    }

    await prisma.student_team.deleteMany({
      where: { team_id: teamId }
    });

    await prisma.team.delete({
      where: { id: teamId }
    });

    res.json({ message: 'Turma excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir turma.', error: error.message });
  }
});


export default router;

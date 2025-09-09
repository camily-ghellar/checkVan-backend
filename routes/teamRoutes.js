import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { addressToCoords } from '../services/geocodingService.js';

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, async (req, res) => {
  if (req.user.role !== "driver") return res.status(403).json({ message: "Apenas motoristas." });

  const { name, school_id, departure_time, arrival_time, starting_point, starting_lat, starting_lon } = req.body;
  if (!name || !school_id) return res.status(400).json({ message: "Campos obrigatórios." });

  try {
    const team = await prisma.team.create({
      data: {
        name,
        driver_id: req.user.id,
        school_id: Number(school_id),
        departure_time: departure_time ? new Date(departure_time) : null,
        arrival_time: arrival_time ? new Date(arrival_time) : null,
        starting_point,
        starting_lat,
        starting_lon,
      },
    });

    res.status(201).json({ message: "Turma criada.", team });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar turma.", error: err.message });
  }
});

router.post('/assignStudent', authenticateToken, async (req, res) => {
  const { student_id, team_id } = req.body;

  try {
    await prisma.student_team.create({
      data: { student_id, team_id }
    });

    res.json({ message: 'Estudante atribuído à turma com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atribuir estudante.', error: err.message });
  }
});

router.get('/getAllByDriver', authenticateToken, async (req, res) => {
  const driverId = req.user.id;

  try {
    const teams = await prisma.team.findMany({
      where: { driver_id: driverId },
      include: {
        school: true,
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

    res.json({ teams });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar turmas.', error: err.message });
  }
});

router.get("/getAll", authenticateToken, async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: { driver: true, student_team: { include: { student: true } } },
    });
    res.json({ teams });
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar turmas.", error: err.message });
  }
});

router.get('/get/:id', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const teamId = Number(req.params.teamId);

  if (Number.isNaN(teamId)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        school: true,
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

    if (!team) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    if (team.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    res.json({ team });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar turma.', error: error.message });
  }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const teamId = Number(req.params.teamId);
  const { name, departure_time, arrival_time, starting_point, school_id } = req.body;

  if (Number.isNaN(teamId)) {
    return res.status(400).json({ message: 'ID inválido.' });
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
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    let coords = null;
    if (starting_point) {
      coords = await addressToCoords(starting_point);
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        ...(name && { name }),
        ...(departure_time && { departure_time: new Date(departure_time) }),
        ...(arrival_time && { arrival_time: new Date(arrival_time) }),
        ...(starting_point && { starting_point }),
        ...(coords && {
          starting_lat: coords.lat ? parseFloat(coords.lat) : null,
          starting_lon: coords.lon ? parseFloat(coords.lon) : null
        }),
        ...(school_id && { school_id: Number(school_id) })
      }
    });

    res.json({ message: 'Turma atualizada com sucesso.', team: updatedTeam });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar turma.', error: error.message });
  }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const teamId = Number(req.params.teamId);

  if (Number.isNaN(teamId)) {
    return res.status(400).json({ message: 'ID inválido.' });
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
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    await prisma.student_team.deleteMany({ where: { team_id: teamId } });
    await prisma.team.delete({ where: { id: teamId } });

    res.json({ message: 'Turma excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir turma.', error: error.message });
  }
});

export default router;




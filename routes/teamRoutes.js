import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from "../middlewares/roles.js";
import { recalculateTeamRoutes } from "../services/teamService.js";
import { addressToCoords, coordsToAddress } from '../services/geocodingService.js'

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, requireDriver, async (req, res) => {
  const { name, school_id, address, van_id, shift } = req.body;

  if (!name || !school_id || !shift)
    return res.status(400).json({ message: "Campos obrigatórios: name, school_id, shift." });

  const coords = address ? await addressToCoords(address) : null;
  try {
    const team = await prisma.team.create({
      data: {
        name,
        shift,
        driver_id: req.user.id,
        school_id: Number(school_id),
        starting_lat: coords?.lat ?? null,
        starting_lon: coords?.lon ?? null, 
        van_id: van_id ? Number(van_id) : null 
      },
      include: { van: true, school: true }
    });

    const updatedTeam = await recalculateTeamRoutes(team.id, shift, coords?.lat, coords?.lon);

    res.status(201).json({ message: "Turma criada com sucesso.", team: updatedTeam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar turma.", error: err.message });
  }
});

router.get('/getAllByDriver', authenticateToken, requireDriver, async (req, res) => {
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
                user: { select: { id: true, name: true } },
                address: true,
              }
            }
          }
        }
      },
      orderBy: { departure_time_going: 'asc' }
    });

    const teamsWithAddress = await Promise.all(
      teams.map(async (team) => {
        if (!team.address && team.starting_lat && team.starting_lon) {
          try {
            const foundAddress = await coordsToAddress(team.starting_lat, team.starting_lon);
            
            return { ...team, address: foundAddress };
          } catch (geoErr) {
            console.error(`Falha no geocoding reverso para a turma ${team.id}:`, geoErr.message);
            return { ...team, address: "Endereço não encontrado" };
          }
        }
        return team;
      })
    );
    res.json({ teams: teamsWithAddress });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar turmas.', error: err.message });
  }
});


router.get("/getAll", authenticateToken, requireDriver, async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        driver: true,
        student_team: { include: { student: true } },
        school: true
      },
      orderBy: { id: 'desc' }
    });
    res.json({ teams });
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar turmas.", error: err.message });
  }
});


router.get('/get/:id', authenticateToken, requireDriver, async (req, res) => {
  const teamId = Number(req.params.id);
  if (Number.isNaN(teamId))
    return res.status(400).json({ message: 'ID inválido.' });

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

    if (!team) return res.status(404).json({ message: 'Turma não encontrada.' });
    res.json({ team });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar turma.', error: error.message });
  }
});


router.put("/update/:id", authenticateToken, requireDriver, async (req, res) => {
  const teamId = Number(req.params.id);
  const { name, shift, school_id, address, van_id } = req.body;

  try {
    const data = {
      ...(name && { name }),
      ...(shift && { shift }),
    };

    if (school_id) {
      data.school = {
        connect: { id: Number(school_id) }
      };
    }

    if ('van_id' in req.body) {
      if (van_id) {
        data.van = {
          connect: { id: Number(van_id) }
        };
      } else {
        data.van = {
          disconnect: true
        };
      }
    }

    let newCoords = {};

    if (address) {
      const coords = await addressToCoords(address);
      data.starting_lat = coords?.lat ?? null;
      data.starting_lon = coords?.lon ?? null;
      newCoords = { lat: coords?.lat, lon: coords?.lon };
    }

    await prisma.team.update({ where: { id: teamId }, data });

    const teamData = await prisma.team.findUnique({ where: { id: teamId } });

    const updatedTeam = await recalculateTeamRoutes(
      teamId, 
      teamData.shift, 
      teamData.starting_lat, 
      teamData.starting_lon
    );

    res.json({ message: "Turma atualizada com sucesso.", team: updatedTeam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar turma.", error: err.message });
  }
});

router.post('/assignStudent', authenticateToken, requireDriver, async (req, res) => {
  const { student_id, team_id } = req.body;

  try {
    await prisma.student_team.create({
      data: { student_id, team_id }
    });

    const updatedTeam = await recalculateTeamRoutes(
      team_id,
      undefined, 
      undefined, 
      undefined  
    );
    res.json({ 
      message: 'Estudante atribuído à turma com sucesso.',
      team: updatedTeam
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atribuir estudante.', error: err.message });
  }
});



router.delete('/delete/:id', authenticateToken, requireDriver, async (req, res) => {
  const driverId = req.user.id;
  const teamId = Number(req.params.id);

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

    await prisma.student_team.deleteMany({ where: { team_id: teamId } });
    await prisma.team.delete({ where: { id: teamId } });

    res.json({ message: 'Turma excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir turma.', error: error.message });
  }
});


export default router;
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from "../middlewares/roles.js";
import { recalculateTeamRoutes } from "../services/teamService.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, requireDriver, async (req, res) => {
  const { name, school_id, starting_lat, starting_lon, plate, nickname, capacity, code, shift } = req.body;

  if (!name || !school_id || !shift)
    return res.status(400).json({ message: "Campos obrigatórios: name, school_id, shift." });

  try {
    let van = null;
    if (plate) {
      van = await prisma.van.findUnique({ where: { plate } });
      if (!van) {
        van = await prisma.van.create({
          data: { plate, nickname: nickname ?? "", capacity: capacity ?? 0, driver_id: req.user.id }
        });
      }
    }

    const team = await prisma.team.create({
      data: {
        name,
        code,
        shift,
        driver_id: req.user.id,
        school_id: Number(school_id),
        starting_lat,
        starting_lon,
        van_id: van?.id ?? null
      },
      include: { van: true, school: true }
    });

    const updatedTeam = await recalculateTeamRoutes(team.id, shift, starting_lat, starting_lon);

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
                user: { select: { id: true, name: true } }
              }
            }
          }
        }
      },
      orderBy: { departure_time: 'asc' }
    });

    res.json({ teams });
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
  const { name, code, shift, school_id, starting_lat, starting_lon } = req.body;

  try {
    const data = {
      ...(name && { name }),
      ...(code && { code }),
      ...(shift && { shift }),
      ...(school_id && { school_id }),
      ...(starting_lat && { starting_lat }),
      ...(starting_lon && { starting_lon })
    };

    await prisma.team.update({ where: { id: teamId }, data });

    const updatedTeam = await recalculateTeamRoutes(teamId, shift, starting_lat, starting_lon);

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


function generateCode() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';

  let codigo = '';
  for (let i = 0; i < 3; i++) {
    codigo += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  for (let i = 0; i < 3; i++) {
    codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }
  return codigo;
}


router.get('/generateCode', authenticateToken, requireDriver, async (req, res) => {
  try {
    let codigo;
    let existente;

    do {
      codigo = generateCode();
      existente = await prisma.team.findUnique({ where: { code: codigo } });
    } while (existente);

    res.status(200).json({ code: codigo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao gerar código da turma.', error: err.message });
  }
});


export default router;

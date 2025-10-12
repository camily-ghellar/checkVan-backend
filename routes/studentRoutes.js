import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver, requireGuardian, requireRoles} from "../middlewares/roles.js";
import { addressToCoords } from '../services/geocodingService.js';

const router = Router();
const prisma = new PrismaClient();


function toDateOnlyUTC(date) {
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  return new Date(Date.UTC(year, month, day));
}


router.post('/create', authenticateToken, requireDriver, async (req, res) => {
  const { name, birth_date, gender, school_id, address, shift_going, shift_return } = req.body;

  if (!['male','female'].includes(gender)) return res.status(400).json({ message: 'Gênero inválido.' });
  if (!school_id) return res.status(400).json({ message: 'school_id é obrigatório.' });

  try {
    const coords = address ? await addressToCoords(address) : null;

    const student = await prisma.student.create({
      data: {
        name,
        gender,
        shift_going,
        shift_return,
        birth_date: new Date(birth_date),
        guardian_id: req.user.id,
        school_id: Number(school_id),
        address: address ?? null,
        latitude: coords?.lat ?? null,
        longitude: coords?.lon ?? null
      }
    });

    res.status(201).json({ message: 'Estudante cadastrado com sucesso.', student });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar estudante.', error: err.message });
  }
});


router.put('/update/:id', authenticateToken, requireGuardian, async (req, res) => {
  const { id } = req.params;
  const { name, address, school_id, birth_date, gender, shift_going, shift_return } = req.body;

  try {
    const data = {
      ...(name && { name }),
      ...(school_id && { school_id }),
      ...(birth_date && { birth_date }),
      ...(gender && { gender }),
      ...(shift_going && { shift_going }),
      ...(shift_return && { shift_return }),
    };

    if (address) {
      const coords = await addressToCoords(address);
      data.address = address;
      data.latitude = coords?.lat ?? null;
      data.longitude = coords?.lon ?? null;
    }

    const updated = await prisma.student.update({ where: { id: parseInt(id, 10) }, data });
    res.json({ message: 'Estudante atualizado com sucesso.', student: updated });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar estudante.', error: err.message });
  }
});


router.put('/:id/presence', authenticateToken, requireRoles("guardian", "driver"), async (req, res) => {
  const id = Number(req.params.id);
  const { date, status } = req.body;

  const validStatuses = ['BOTH', 'GOING', 'RETURNING', 'NONE'];
  if (!date || !status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Data e um status válido (BOTH, GOING, RETURNING, NONE) são obrigatórios.' });
  }

  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) return res.status(404).json({ message: 'Estudante não encontrado.' });

  if (req.user.role === 'guardian' && student.guardian_id !== req.user.id) {
    return res.status(403).json({ message: 'Você não pode alterar presença de outro responsável.' });
  }

  try {
    const dateOnly = toDateOnlyUTC(date);

    const presence = await prisma.student_presence.upsert({
      where: { student_id_date: { student_id: id, date: dateOnly } },
      update: { status },
      create: { student_id: id, date: dateOnly, status },
    });

    res.json({
      message: `Status de presença atualizado para ${date}`,
      presence: {
        ...presence,
        date: presence.date.toISOString().slice(0, 10)
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar presença.', error: err.message });
  }
});

router.get("/:id/presence/day", authenticateToken, requireRoles("guardian", "driver"), async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  if (!date) return res.status(400).json({ message: "Parâmetro 'date' é obrigatório." });

  try {
    const dateOnly = toDateOnlyUTC(String(date));

    const presence = await prisma.student_presence.findUnique({
      where: { student_id_date: { student_id: parseInt(id, 10), date: dateOnly } },
    });

    if (!presence) {
      return res.json({ 
        student_id: parseInt(id, 10), 
        date: dateOnly.toISOString().slice(0, 10), 
        status: 'BOTH' 
      });
    }

    res.json({
      ...presence,
      date: presence.date.toISOString().slice(0, 10),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id/presences/month", authenticateToken, requireRoles("guardian", "driver"), async (req, res) => {
  const { id } = req.params;
  const { month, year } = req.query;

  if (!month || !year) return res.status(400).json({ error: "Informe mês e ano no formato ?month=MM&year=YYYY" });

  const monthInt = parseInt(String(month), 10) - 1;
  const yearInt = parseInt(String(year), 10);

  const startDate = toDateOnlyUTC(`${yearInt}-${monthInt + 1}-01`);
  const endDate   = toDateOnlyUTC(`${yearInt}-${monthInt + 1}-${new Date(yearInt, monthInt + 1, 0).getDate()}`);

  try {
    const presences = await prisma.student_presence.findMany({
      where: {
        student_id: parseInt(id, 10),
        date: { gte: startDate, lte: endDate },
      },
      select: { date: true, status: true },
    });

    const presenceMap = presences.reduce((acc, record) => {
      acc[record.date.toISOString().slice(0, 10)] = record.status;
      return acc;
    }, {});

    const daysInMonth = new Date(yearInt, monthInt + 1, 0).getDate();
    const result = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = toDateOnlyUTC(`${yearInt}-${monthInt + 1}-${day}`);
      const isoDate = currentDate.toISOString().slice(0, 10);

      result.push({
        date: isoDate,
        status: presenceMap[isoDate] !== undefined ? presenceMap[isoDate] : 'BOTH',
      });
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:id', authenticateToken, requireGuardian, async (req, res) => {

  const id = Number(req.params.id);
  const student = await prisma.student.findUnique({ where: { id: id } });

  try {
    await prisma.student.delete({ where: { id: id } });
    res.json({ message: 'Estudante deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar estudante.', error: err.message });
  }

});


router.get('/get/:id', authenticateToken, requireRoles("guardian", "driver"), async (req, res) => {

  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido.' });

  try {
    const student = await prisma.student.findUnique({ where: { id: id } });
    if (!student) return res.status(404).json({ message: 'Estudante não encontrado.' });

    res.json({ student });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar estudante.', error: err.message });
  }

});


router.get('/getAll', authenticateToken, requireRoles("guardian", "driver"), async (req, res) => {

  try {
    const students = await prisma.student.findMany();
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar estudantes.', error: err.message });
  }

});


router.get('/getStudents', authenticateToken, requireGuardian, async (req, res) => {

  try {
    const students = await prisma.student.findMany({
      where: { guardian_id: req.user.id },
      select: {
        id: true,
        name: true,
        birth_date: true,
        gender: true,
        guardian_id: true,
      },
    });

    if (!students.length) {
      return res.status(404).json({ message: 'Nenhum estudante encontrado para este usuário.' });
    }

    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados dos estudantes.', error: err.message });
  }

});

router.get('/presence-summary', authenticateToken, requireGuardian, async (req, res) => {
  try {
    const now = new Date();
    let targetDate = new Date();

    // A regra de negócio para definir se é hoje ou amanhã permanece a mesma.
    // O corte de 18:00 no fuso de Blumenau (UTC-3) equivale a 21:00 em UTC.
    if (now.getUTCHours() >= 21) {
      targetDate.setUTCDate(targetDate.getUTCDate() + 1);
    }
    console.log("now", now);
    console.log("targetDate", targetDate);
    
    const dateForQuery = toDateOnlyUTC(targetDate.toISOString());
    console.log("targetDate.toISOString()", targetDate.toISOString());
    console.log("dateForQuery", dateForQuery);

    const students = await prisma.student.findMany({
      where: { guardian_id: req.user.id },
      select: {
        id: true,
        name: true,
      },
    });

    if (students.length === 0) {
      return res.json([]); 
    }

    const studentIds = students.map(s => s.id);
    const presencesFound = await prisma.student_presence.findMany({
      where: {
        student_id: { in: studentIds },
        date: dateForQuery, 
      },
      select: {
        student_id: true,
      },
    });

    const confirmedStudentIds = new Set(presencesFound.map(p => p.student_id));

    const result = students.map(student => ({
      id: student.id,
      name: student.name,
      image_profile: null,
      is_presence_confirmed: confirmedStudentIds.has(student.id),
    }));

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar resumo de presença:", err);
    res.status(500).json({ message: 'Erro ao buscar resumo de presença.', error: err.message });
  }
});

export default router;

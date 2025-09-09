import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { addressToCoords } from '../services/geocodingService.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/create', authenticateToken, async (req, res) => {
  if (req.user.role !== 'guardian') {
    return res.status(403).json({ message: 'Apenas responsáveis podem cadastrar estudantes.' });
  }

  const { name, birth_date, gender, school_id, address } = req.body;

  if (!['male','female'].includes(gender)) return res.status(400).json({ message: 'Gênero inválido.' });
  if (!school_id) return res.status(400).json({ message: 'school_id é obrigatório.' });

  try {
    const coords = address ? await addressToCoords(address) : null;

    const student = await prisma.student.create({
      data: {
        name,
        gender,
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

router.put('/update/:id', authenticateToken, async (req, res) => {
  const studentId = Number(req.params.studentId);
  if (Number.isNaN(studentId)) return res.status(400).json({ message: 'ID inválido.' });

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student || student.guardian_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });

  const { name, birth_date, gender, school_id, address } = req.body;

  try {
    const coords = address ? await addressToCoords(address) : null;

    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: {
        ...(name && { name }),
        ...(birth_date && { birth_date: new Date(birth_date) }),
        ...(gender && { gender }),
        ...(school_id && { school_id: Number(school_id) }),
        ...(address && { address }),
        ...(coords && { latitude: coords.lat, longitude: coords.lon })
      }
    });

    res.json({ message: 'Estudante atualizado com sucesso.', student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar estudante.', error: err.message });
  }
});

router.put('/:id/presence', authenticateToken, async (req, res) => {
  const studentId = Number(req.params.studentId);
  const { date, is_going } = req.body;

  if (!date || typeof is_going !== 'boolean') return res.status(400).json({ message: 'Data e is_going são obrigatórios.' });

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student || student.guardian_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });

  try {
    const presence = await prisma.student_presence.upsert({
      where: { student_id_date: { student_id: studentId, date: new Date(date) } },
      update: { is_going },
      create: { student_id: studentId, date: new Date(date), is_going }
    });

    res.json({ message: is_going ? `Presença confirmada para ${date}` : `Ausência marcada para ${date}`, presence });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar presença.', error: err.message });
  }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  const studentId = Number(req.params.studentId);
  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student || student.guardian_id !== req.user.id) return res.status(403).json({ message: 'Acesso negado.' });

  try {
    await prisma.student.delete({ where: { id: studentId } });
    res.json({ message: 'Estudante deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar estudante.', error: err.message });
  }
});

router.get('/get/:id', authenticateToken, async (req, res) => {
  const studentId = Number(req.params.studentId);
  if (Number.isNaN(studentId)) return res.status(400).json({ message: 'ID inválido.' });

  try {
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) return res.status(404).json({ message: 'Estudante não encontrado.' });

    res.json({ student });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar estudante.', error: err.message });
  }
});

router.get('/getAll', authenticateToken, async (req, res) => {
  try {
    const students = await prisma.student.findMany({ where: { guardian_id: req.user.id } });
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar estudantes.', error: err.message });
  }
});

export default router;

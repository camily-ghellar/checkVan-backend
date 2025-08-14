import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/registration', authenticateToken, async (req, res) => {
  const { name, birth_date, gender } = req.body;

  if (!['male', 'female'].includes(gender)) {
    return res.status(400).json({ message: 'Gênero inválido.' });
  }

  try {
    const student = await prisma.student.create({
      data: {
        name,
        gender,
        birth_date: new Date(birth_date),
        guardian_id: req.user.id
      }
    });

    res.status(201).json({ message: 'Estudante cadastrado com sucesso.', student });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar estudante.', error: error.message });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  const guardianId = req.user.id;
  const { name, birth_date, gender } = req.body;

  try {
    const student = await prisma.student.findFirst({
      where: { guardian_id: guardianId }
    });

    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado para este usuário.' });
    }

    const updatedStudent = await prisma.student.update({
      where: { id: student.id },
      data: {
        ...(name && { name }),
        ...(birth_date && { birth_date: new Date(birth_date) }),
        ...(gender && { gender })
      }
    });

    res.json({ message: 'Estudante atualizado com sucesso.', student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar estudante.', error: err.message });
  }
});

router.get('/getProfile/:studentId', authenticateToken, async (req, res) => {
  const studentIdRaw = req.params.studentId;
  const studentId = parseInt(studentIdRaw, 10);

  if (Number.isNaN(studentId)) {
    return res.status(400).json({ message: 'ID do estudante inválido.' });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        birth_date: true,
        gender: true,
        guardian_id: true
      }
    });

    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado.' });
    }

    res.json({ student });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados do estudante.', error: err.message });
  }
});

router.delete('/delete', authenticateToken, async (req, res) => {
  const guardianId = req.user.id;
  const { studentId } = req.body;

  try {
    if (!studentId) {
      return res.status(400).json({ message: 'ID do estudante é obrigatório.' });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student || student.guardian_id !== guardianId) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este estudante.' });
    }

    await prisma.student.delete({
      where: { id: studentId }
    });

    res.json({ message: 'Estudante deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar estudante.', error: err.message });
  }
});

// Rota para buscar alunos por ID da turma (team_id) trip -> team -> studentTeam
router.get('/getByTeamId/:teamId', authenticateToken, async (req, res) => {
  const teamId = parseInt(req.params.teamId, 10);

  if (isNaN(teamId)) {
    return res.status(400).json({ message: 'O ID da turma é inválido.' });
  }

  try {
    // 1. Encontra todos os links na tabela student_team para obter os IDs dos alunos
    const studentTeamLinks = await prisma.student_team.findMany({
      where: { team_id: teamId },
      select: { student_id: true } // Seleciona apenas o ID do aluno
    });

    // Se não houver alunos na turma, retorna uma lista vazia
    if (studentTeamLinks.length === 0) {
      return res.json({ students: [] });
    }

    // 2. Extrai apenas os IDs para uma lista simples: [1, 5, 12]
    const studentIds = studentTeamLinks.map(link => link.student_id);

    // 3. Busca os dados completos de todos os alunos cujos IDs estão na lista
    const students = await prisma.student.findMany({
      where: {
        id: {
          in: studentIds // 'in' é o operador para "está contido em"
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json({ students });

  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados dos estudantes.', error: err.message });
  }
});


export default router;

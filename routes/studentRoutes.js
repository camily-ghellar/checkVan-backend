import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { addressToCoords } from '../services/geocodingService.js';


const router = Router();
const prisma = new PrismaClient();

router.post('/registration', authenticateToken, async (req, res) => {
  const { name, birth_date, gender, school_id, address } = req.body;

  if (!['male', 'female'].includes(gender)) {
    console.log("Erro genero");
    return res.status(400).json({ message: 'Gênero inválido.' });
  }
  if (!school_id) {
    console.log("Erro school_id")
    return res.status(400).json({ message: 'school_id é obrigatório.' });
  }

  try {
    const coords = address ? await addressToCoords(address) : null;
    const student = await prisma.student.create({
      data: {
        name,
        gender,
        birth_date: new Date(birth_date),
        guardian_id: req.user.id,
        school_id: Number(school_id),
        address: address,
        latitude: coords?.lat ? parseFloat(coords.lat) : null,
        longitude: coords?.lon ? parseFloat(coords.lon) : null
      }
    });

    res.status(201).json({ message: 'Estudante cadastrado com sucesso.', student });
  } catch (error) {
    console.log("error.messag", error.message);
    res.status(500).json({ message: 'Erro ao cadastrar estudante.', error: error.message });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  const guardianId = req.user.id;
  const { name, birth_date, gender, school_id, address, is_going_today } = req.body;

  try {
    const student = await prisma.student.findFirst({
      where: { guardian_id: guardianId }
    });

    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado para este usuário.' });
    }

    const coords = address ? await addressToCoords(address) : null;

    const updatedStudent = await prisma.student.update({
      where: { id: student.id },
      data: {
        ...(name && { name }),
        ...(birth_date && { birth_date: new Date(birth_date) }),
        ...(gender && { gender }),
        ...(school_id && { school_id: Number(school_id) }),
        ...(address !== undefined && { address }),
        ...(coords && { latitude: coords.lat, longitude: coords.lon }),
        ...(typeof is_going_today === 'boolean' && { is_going_today })
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
        guardian_id: true,
        school_id: true,
        address: true,
        latitude: true,
        longitude: true,
        is_going_today: true
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


router.put('/:studentId/presence', authenticateToken, async (req, res) => {
  try {
    const { studentId } = req.params;
    const { is_going_today } = req.body;

    if (req.user.role !== 'guardian') {
      return res.status(403).json({ error: 'Apenas responsáveis podem confirmar a presença' });
    }

    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId) },
      select: { id: true, guardian_id: true }
    });

    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    if (student.guardian_id !== req.user.id) {
      return res.status(403).json({ error: 'Você só pode confirmar presença dos seus filhos' });
    }

    const updated = await prisma.student.update({
      where: { id: student.id },
      data: { is_going_today: Boolean(is_going_today) }
    });

    res.json({
      message: is_going_today ? 'Presença confirmada' : 'Presença removida',
      student: updated
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar presença' });
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

router.get('/studentsByTrip/:tripId', authenticateToken, async (req, res) => {
  const tripId = parseInt(req.params.tripId, 10);

  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { school: true }
    });

    if (!trip) {
      return res.status(404).json({ message: 'Viagem não encontrada.' });
    }

    const students = await prisma.student.findMany({
      where: { school_id: trip.school_id }
    });

    res.json({ school: trip.school, students });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos.', error: error.message });
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

router.get('/getAllStudents', authenticateToken, async (req, res) => {
  // Opcional, mas recomendado: Adicionar uma verificação de permissão
  // para garantir que apenas motoristas possam acessar esta rota.
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Acesso não autorizado.' });
  }

  try {
    const students = await prisma.student.findMany({
      // Ordena a lista de alunos em ordem alfabética
      orderBy: {
        name: 'asc',
      },
      // 'include' é usado para trazer dados de tabelas relacionadas na mesma consulta.
      // Isso é muito eficiente, pois evita que o app precise fazer uma nova chamada
      // para buscar o nome da escola de cada aluno.
      include: {
        school: true, // Inclui os dados da escola de cada aluno
      },
    });

    // Retorna a lista de estudantes. Se não houver nenhum, retornará uma lista vazia [].
    res.status(200).json({ students });

  } catch (error) {
    console.log({ message: 'Erro ao buscar todos os estudantes.', error: error.message });
    res.status(500).json({ message: 'Erro ao buscar todos os estudantes.', error: error.message });
  }
});


export default router;
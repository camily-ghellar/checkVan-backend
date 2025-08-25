import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

// router.post('/assign', authenticateToken, async (req, res) => {
//   const { student_id, trip_id } = req.body;

//   try {
//     await prisma.student_team.create({
//       data: { student_id, trip_id }
//     });

//     res.json({ message: 'Estudante atribuído à equipe com sucesso' });
//   } catch (err) {
//     res.status(500).json({ message: 'Erro ao atribuir estudante à equipe', error: err.message });
//   }
// });

router.post('/assign', authenticateToken, async (req, res) => {
  // 1. Recebe 'team_id' em vez de 'trip_id'
  const { student_id, team_id } = req.body;

  // Validação
  if (!student_id || !team_id) {
    return res.status(400).json({ message: 'student_id e team_id são obrigatórios.' });
  }

  try {
    // Opcional: Verificar se o aluno e a turma existem antes de criar o link
    // ...

    await prisma.student_team.create({
      data: { 
        student_id: Number(student_id), 
        team_id: Number(team_id) 
      }
    });

    res.status(201).json({ message: 'Estudante atribuído à turma com sucesso' });
  } catch (err) {
    // Adiciona um log mais detalhado do erro
    console.error('Erro ao atribuir estudante:', err);
    // Trata erros de chave única (aluno já na turma)
    if (err.code === 'P2002') {
      return res.status(409).json({ message: 'Este estudante já está nesta turma.' });
    }
    res.status(500).json({ message: 'Erro ao atribuir estudante à turma', error: err.message });
  }
});

// Rota para DESVINCULAR um aluno de uma turma
router.delete('/unassign', authenticateToken, async (req, res) => {
  // 1. Recebe os IDs do corpo da requisição
  const { student_id, team_id } = req.body;

  // 2. Validação para garantir que ambos os IDs foram enviados
  if (!student_id || !team_id) {
    return res.status(400).json({ message: 'student_id e team_id são obrigatórios.' });
  }

  try {
    // 3. Usa prisma.student_team.delete para remover o registro
    await prisma.student_team.delete({
      where: {
        // Identifica o registro exato pela chave composta (student_id + team_id)
        // O Prisma gera este identificador automaticamente a partir do seu schema
        student_id_team_id: {
          student_id: Number(student_id),
          team_id: Number(team_id),
        },
      },
    });

    // 4. Retorna uma mensagem de sucesso
    res.status(200).json({ message: 'Estudante desvinculado da turma com sucesso.' });

  } catch (err) {
    console.error('Erro ao desvincular estudante:', err);
    // Trata o erro caso o registro a ser deletado não seja encontrado
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Vínculo entre estudante e turma não encontrado.' });
    }
    res.status(500).json({ message: 'Erro ao desvincular estudante da turma.', error: err.message });
  }
});

export default router;

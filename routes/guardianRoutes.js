import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middlewares/auth.js';
const { sign } = jwt;

const prisma = new PrismaClient();
const router = Router();

router.post('/registration', async (req, res) => {
  const { guardian_name, phone, email, password } = req.body;

  try {
    const hashedPassword = hashSync(password, 10);
    const newGuardian = await prisma.guardians.create({
      data: {
        guardian_name,
        phone,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Responsável cadastrado com sucesso', id: newGuardian.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar responsável', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const guardian = await prisma.guardians.findUnique({ where: { email } });

    if (!guardian || !compareSync(password, guardian.password)) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    const token = sign({ id: guardian.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  const { guardian_name, phone, email, password } = req.body;
  const id = req.user.id;

  try {
    const hashedPassword = password ? hashSync(password, 10) : undefined;

    const updatedGuardian = await prisma.guardians.update({
      where: { id: parseInt(id) },
      data: {
        guardian_name,
        phone,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    res.json({ message: "Guardião atualizado com sucesso", guardian: updatedGuardian });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar guardião", error: error.message });
  }
});

export default router;

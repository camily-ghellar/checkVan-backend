import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { createTransport } from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

const router = Router();
const prisma = new PrismaClient();

router.post('/create', async (req, res) => {
  const { name, phone, email, password, role, driver_license, birth_date } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
  }

  if (!['guardian', 'driver'].includes(role)) {
    return res.status(400).json({ message: 'Role inválido. Use guardian ou driver.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Já existe um usuário com este e-mail.' });
    }

    const hashedPassword = hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        role,
        driver_license: role === 'driver' ? driver_license : null,
        birth_date: birth_date ? new Date(birth_date) : null,
      },
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.', userId: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno ao cadastrar usuário.', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    const token = sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login realizado com sucesso.', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno ao tentar fazer login.', error: err.message });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  const { name, phone, email, password, driver_license, birth_date } = req.body;
  const userId = req.user.id;

  try {
    const data = {};
    if (name) data.name = name;
    if (phone) data.phone = phone;
    if (email) data.email = email;
    if (driver_license) data.driver_license = driver_license;
    if (birth_date) data.birth_date = new Date(birth_date);
    if (password) data.password = hashSync(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data
    });

    res.json({ message: 'Informações atualizadas com sucesso.', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar informações.', error: err.message });
  }
});

router.post('/recoverPassword', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'E-mail é obrigatório.' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = hashSync(tempPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recupere sua senha - Van Escolar',
      text: `Sua senha provisória é: ${tempPassword}\n\nUse-a para acessar sua conta e troque-a em seguida.`,
    });

    res.json({ message: 'Senha provisória enviada para o e-mail de login.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao recuperar senha.', error: err.message });
  }
});

router.get('/getProfile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        driver_license: true,
        birth_date: true,
      },
    });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.', error: err.message });
  }
});

router.get('/getStudents', authenticateToken, async (req, res) => {
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

export default router;

import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { createTransport } from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

const router = Router();
const prisma = new PrismaClient();

router.post('/registration', async (req, res) => {
  const { name, phone, email, password, role, driver_license, birth_date } = req.body;

  if (!['guardian', 'driver'].includes(role)) {
    return res.status(400).json({ message: 'Role inválido.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({where:{email}})
    if(existingUser){
      return res.status(409).json({message: 'Já existe um usuário com este e-mail.'});
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
        birth_date: new Date(birth_date)
      }
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.', userId: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno ao cadastrar usuário.', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    const passwordMatch = compareSync(password, user.password);
    if(!passwordMatch){
      return res.status(401).json({message: 'Senha incorreta.'});
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
    const hashedPassword = password ? hashSync(password, 10) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
        email,
        driver_license,
        birth_date: birth_date ? new Date(birth_date) : undefined,
        ...(hashedPassword && { password: hashedPassword })
      }
    });

    res.json({ message: 'Informações atualizadas com sucesso.', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar informações.', error: err.message });
  }
});

router.post('/recoverPassword', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = hashSync(tempPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recupere sua senha do APP de Van Escolar',
      text: `Para recuperar a sua senha no aplicativo de gerenciamento de van escolar, utilize a senha provisória abaixo para fazer o login na sua conta. Após fazer o login, você pode ir na tela de atualizar as informações da sua conta e alterar sua senha. Você também pode continuar utilizando esta senha gerada por nós se assim preferir.
      Sua senha provisória é: ${tempPassword}`
    });

    res.json({ message: 'Senha provisória enviada para o e-mail de login.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao recuperar senha.', error: err.message });
  }
});

router.get('/getProfile', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        driver_license: true,
        birth_date: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.', error: err.message });
  }
});

router.get('/getStudents', authenticateToken, async (req, res) => {
  const guardianId = req.user.id;

  try {
    const students = await prisma.student.findMany({
      where: { guardian_id: guardianId },
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        birth_date: true,
        gender: true,
        guardian_id: true
      }
    });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'Nenhum estudante encontrado para este usuário.' });
    }

    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados dos estudantes.', error: err.message });
  }
});

export default router;

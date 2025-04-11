import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middlewares/auth.js';
const { sign } = jwt;

const prisma = new PrismaClient();
const router = Router();

router.post('/registration', async (req, res) => {
  const { driver_name, phone, email, password, driver_license } = req.body;

  try {
    const hashedPassword = hashSync(password, 10);
    const newDriver = await prisma.drivers.create({
      data: {
        driver_name,
        phone,
        email,
        password: hashedPassword,
        driver_license,
      },
    });

    res.status(201).json({ message: 'Motorista cadastrado com sucesso', id: newDriver.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar motorista', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await prisma.drivers.findUnique({ where: { email } });

    if (!driver || !compareSync(password, driver.password)) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    const token = sign({ id: driver.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  const { driver_name, phone, email, password, driver_license } = req.body;
  const id = req.user.id;

  try {
    const hashedPassword = password ? hashSync(password, 10) : undefined;

    const updatedDriver = await prisma.drivers.update({
      where: { id: parseInt(id) },
      data: {
        driver_name,
        phone,
        email,
        driver_license,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    res.json({ message: "Motorista atualizado com sucesso", driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar motorista", error: error.message });
  }
});

export default router;

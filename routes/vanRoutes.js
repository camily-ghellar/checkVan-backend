import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from "../middlewares/roles.js";

const router = Router();
const prisma = new PrismaClient();


router.post("/create", authenticateToken, requireDriver, async (req, res) => {

  const { nickname, plate, capacity } = req.body;
  if (!nickname || !plate || !capacity) {
    return res.status(400).json({ message: "Todos os campos obrigatórios." });
  }

  try {
    const van = await prisma.van.create({
      data: { nickname, plate, capacity, driver_id: req.user.id },
    });

    res.status(201).json({ message: "Van cadastrada.", van });
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar van.", error: err.message });
  }

});


router.get('/getAllByDriver', authenticateToken, requireDriver, async (req, res) => {

  try {
    const vans = await prisma.van.findMany({ where: { driver_id: req.user.id } });
    res.json({ vans });
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar vans.", error: err.message });
  }
});


router.get('/getAll', authenticateToken, requireDriver, async (req, res) => {
  try {
    const vans = await prisma.van.findMany({
      include: {
        driver: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    res.json({ vans });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vans.', error: error.message });
  }

});


router.get('/get/:id', authenticateToken, requireDriver, async (req, res) => {

  const vanId = Number(req.params.id);

  if (Number.isNaN(vanId)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const van = await prisma.van.findUnique({
      where: { id: vanId },
      include: { driver: true }
    });

    if (!van) {
      return res.status(404).json({ message: 'Van não encontrada.' });
    }

    res.json({ van });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar van.', error: error.message });
  }

});


router.put('/update/:id', authenticateToken, requireDriver, async (req, res) => {

  const vanId = Number(req.params.id);
  const { nickname, plate, capacity } = req.body;

  if (Number.isNaN(vanId)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const van = await prisma.van.findUnique({
      where: { id: vanId },
      select: { driver_id: true }
    });

    if (!van) {
      return res.status(404).json({ message: 'Van não encontrada.' });
    }

    const updatedVan = await prisma.van.update({
      where: { id: vanId },
      data: {
        ...(nickname && { nickname }),
        ...(plate && { plate }),
        ...(capacity && { capacity: Number(capacity) })
      }
    });

    res.json({ message: 'Van atualizada com sucesso.', van: updatedVan });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar van.', error: error.message });
  }

});


router.delete('/delete/:id', authenticateToken, requireDriver, async (req, res) => {

  const vanId = Number(req.params.id);

  if (Number.isNaN(vanId)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const van = await prisma.van.findUnique({
      where: { id: vanId },
      select: { driver_id: true }
    });

    if (!van) {
      return res.status(404).json({ message: 'Van não encontrada.' });
    }

    await prisma.van.delete({
      where: { id: vanId }
    });

    res.json({ message: 'Van excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir van.', error: error.message });
  }

});

export default router;

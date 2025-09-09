import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, async (req, res) => {
  if (req.user.role !== "driver") return res.status(403).json({ message: "Apenas motoristas." });

  const { brand, model, year, plate, capacity } = req.body;
  if (!brand || !model || !year || !plate || !capacity) {
    return res.status(400).json({ message: "Todos os campos obrigatórios." });
  }

  try {
    const van = await prisma.van.create({
      data: { brand, model, year, plate, capacity, driver_id: req.user.id },
    });

    res.status(201).json({ message: "Van cadastrada.", van });
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar van.", error: err.message });
  }
});

router.get('/getAllByDriver', authenticateToken, async (req, res) => {
  if (req.user.role !== "driver") return res.status(403).json({ message: "Apenas motoristas." });

  try {
    const vans = await prisma.van.findMany({ where: { driver_id: req.user.id } });
    res.json({ vans });
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar vans.", error: err.message });
  }
});

router.get('/getAll', authenticateToken, async (req, res) => {
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

router.get('get/:id', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const vanId = Number(req.params.vanId);

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

    if (van.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    res.json({ van });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar van.', error: error.message });
  }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const vanId = Number(req.params.vanId);
  const { brand, model, year, plate, capacity } = req.body;

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

    if (van.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    const updatedVan = await prisma.van.update({
      where: { id: vanId },
      data: {
        ...(brand && { brand }),
        ...(model && { model }),
        ...(year && { year: Number(year) }),
        ...(plate && { plate }),
        ...(capacity && { capacity: Number(capacity) })
      }
    });

    res.json({ message: 'Van atualizada com sucesso.', van: updatedVan });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar van.', error: error.message });
  }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  const driverId = req.user.id;
  const vanId = Number(req.params.vanId);

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

    if (van.driver_id !== driverId) {
      return res.status(403).json({ message: 'Acesso negado.' });
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

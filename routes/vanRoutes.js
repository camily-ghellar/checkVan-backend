import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middlewares/auth.js";
import { requireDriver } from "../middlewares/roles.js"; 

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, requireDriver, async (req, res) => {
  const { nickname, plate, capacity } = req.body;
  const driver_id = req.user.id;

  if (!nickname || !plate || !capacity) {
    return res.status(400).json({ message: "Apelido, placa e capacidade são obrigatórios." });
  }

  try {
    const newVan = await prisma.van.create({
      data: {
        nickname,
        plate,
        capacity: Number(capacity),
        driver_id: driver_id,
      },
    });
    res.status(201).json({ message: "Van criada com sucesso.", van: newVan });
  } catch (err) {
    if (err.code === 'P2002' && err.meta?.target?.includes('plate')) {
      return res.status(409).json({ message: 'Já existe uma van com esta placa.' });
    }
    res.status(500).json({ message: "Erro ao criar van.", error: err.message });
  }
});

router.get("/getAll", authenticateToken, requireDriver, async (req, res) => {
  const driver_id = req.user.id;
  try {
    const vans = await prisma.van.findMany({
      where: { driver_id: driver_id },
      orderBy: { nickname: 'asc' }, 
    });
    res.json({ vans }); 
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar vans.", error: err.message });
  }
});

router.get("/search", authenticateToken, requireDriver, async (req, res) => {
  const { term } = req.query; 
  const driver_id = req.user.id;

  if (!term || typeof term !== 'string' || term.trim() === '') {
    try {
      const vans = await prisma.van.findMany({ where: { driver_id: driver_id } });
      return res.json({ vans });
    } catch (err) {
       return res.status(500).json({ message: 'Erro ao listar vans.', error: err.message });
    }
  }

  try {
    const vans = await prisma.van.findMany({
      where: {
        driver_id: driver_id,
        OR: [
          {
            nickname: {
              contains: term,
              mode: 'insensitive', 
            },
          },
          {
            plate: {
              contains: term,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: { nickname: 'asc' },
    });
    res.json({ vans });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar vans.', error: err.message });
  }
});

router.put("/update/:id", authenticateToken, requireDriver, async (req, res) => {
  const { id } = req.params;
  const { nickname, plate, capacity } = req.body;
  const driver_id = req.user.id;

  try {
    const vanId = parseInt(id, 10);

    const van = await prisma.van.findFirst({
      where: { id: vanId, driver_id: driver_id },
    });

    if (!van) {
      return res.status(403).json({ message: "Você não tem permissão para editar esta van." });
    }

    const updatedVan = await prisma.van.update({
      where: { id: vanId },
      data: {
        ...(nickname && { nickname }),
        ...(plate && { plate }),
        ...(capacity && { capacity: Number(capacity) }),
      },
    });

    res.json({ message: "Van atualizada com sucesso.", van: updatedVan });
  } catch (err) {
     if (err.code === 'P2002' && err.meta?.target?.includes('plate')) {
      return res.status(409).json({ message: 'Já existe uma van com esta placa.' });
    }
    res.status(500).json({ message: "Erro ao atualizar van.", error: err.message });
  }
});

router.delete("/delete/:id", authenticateToken, requireDriver, async (req, res) => {
  const vanId = parseInt(req.params.id, 10);
  const driver_id = req.user.id;

  try {
    const van = await prisma.van.findFirst({
      where: { id: vanId, driver_id: driver_id },
    });

    if (!van) {
      return res.status(403).json({ message: "Você não tem permissão para excluir esta van." });
    }

    await prisma.$transaction(async (tx) => {
      await tx.van_assignment.deleteMany({
        where: { van_id: vanId },
      });
      
      await tx.team.updateMany({
        where: { van_id: vanId },
        data: { van_id: null },
      });

      await tx.van.delete({
        where: { id: vanId },
      });
    });

    res.json({ message: "Van excluída com sucesso." });

  } catch (err) {
    console.error("Erro ao excluir van:", err.message);
    res.status(500).json({ message: "Erro ao excluir van.", error: err.message });
  }
});

export default router;
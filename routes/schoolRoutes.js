import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middlewares/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name) return res.status(400).json({ message: "Nome obrigatório." });

  try {
    const school = await prisma.school.create({
      data: { name, address, latitude, longitude },
    });

    res.status(201).json({ message: "Escola criada.", school });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar escola.", error: err.message });
  }
});

router.get("/getAll", authenticateToken, async (req, res) => {
  try {
    const schools = await prisma.school.findMany();
    res.json({ schools });
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar escolas.", error: err.message });
  }
});

router.get("/get/:id", authenticateToken, async (req, res) => {
  const schoolId = parseInt(req.params.id, 10);

  try {
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
    });

    if (!school) return res.status(404).json({ message: "Escola não encontrada." });

    res.json({ school });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar escola.", error: err.message });
  }
});

router.put("/update/:id", authenticateToken, async (req, res) => {
  const schoolId = parseInt(req.params.id, 10);
  const { name, address, latitude, longitude } = req.body;

  try {
    const data = {};
    if (name) data.name = name;
    if (address) data.address = address;
    if (latitude !== undefined) data.latitude = latitude;
    if (longitude !== undefined) data.longitude = longitude;

    const updatedSchool = await prisma.school.update({
      where: { id: schoolId },
      data,
    });

    res.json({ message: "Escola atualizada.", school: updatedSchool });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar escola.", error: err.message });
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  const schoolId = parseInt(req.params.id, 10);

  try {
    await prisma.school.delete({
      where: { id: schoolId },
    });

    res.json({ message: "Escola deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar escola.", error: err.message });
  }
});

export default router;

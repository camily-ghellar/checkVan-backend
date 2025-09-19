import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middlewares/auth.js";
import { requireDriver } from "../middlewares/roles.js";
import { addressToCoords, coordsToAddress } from "../services/geocodingService.js";


const router = Router();
const prisma = new PrismaClient();

router.post("/create", authenticateToken, requireDriver, async (req, res) => {

  const { 
    name, 
    address, 
    morning_limit,
    morning_departure,
    afternoon_limit,
    afternoon_departure } = req.body;

  if (!name) return res.status(400).json({ message: "Nome obrigatório." });

  try {
    const coords = address ? await addressToCoords(address) : null;
    
    const school = await prisma.school.create({
      data: { 
        name, 
        address: address ?? null,
        morning_limit,
        morning_departure,
        afternoon_limit,
        afternoon_departure,
        latitude: coords?.lat ?? null,
        longitude: coords?.lon ?? null },
    });

    res.status(201).json({ message: "Escola criada.", school });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar escola.", error: err.message });
  }

});


router.get("/getAll", authenticateToken, requireDriver, async (req, res) => {

  try {
    const schools = await prisma.school.findMany();
    res.json({ schools });
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar escolas.", error: err.message });
  }

});


router.get("/get/:id", authenticateToken, requireDriver, async (req, res) => {

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


router.put("/update/:id", authenticateToken, requireDriver, async (req, res) => {

  const { id } = req.params;
  const { name, address, morning_limit, morning_departure, afternoon_limit, afternoon_departure } = req.body;

  try {
    const data = {
      ...(name && { name }),
      ...(morning_limit && { morning_limit }),
      ...(morning_departure && { morning_departure }),
      ...(afternoon_limit && { afternoon_limit }),
      ...(afternoon_departure && { afternoon_departure }),
    };

    if (address) {
      data.address = address;
      const coords = await addressToCoords(address);
      if (coords) {
        data.latitude = coords.lat ?? null;
        data.longitude = coords.lon ?? null;
      }
    }

    const updated = await prisma.school.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    res.json({ message: "Escola atualizada.", school: updated });
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar escola.", error: err.message });
  }

});


router.delete("/delete/:id", authenticateToken, requireDriver, async (req, res) => {

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

import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import { addressToCoords, coordsToAddress, getAddressAutocomplete, getRealTimeEta } from "../services/geocodingService.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/to-coords", async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: "Parâmetro de endereço é obrigatório." });

    const coords = await addressToCoords(address);
    res.json(coords || { error: "Endereço não encontrado." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/to-address", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Parâmetros de latitude e longitude são obrigatórios." });

    const address = await coordsToAddress(lat, lon);
    res.json({ address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/autocomplete", async (req, res) => {
  try {
    const { input } = req.query;
    if (!input) {
      return res.status(400).json({ error: "Parâmetro de busca é obrigatório." });
    }

    const suggestions = await getAddressAutocomplete(input);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/calculate-eta', async (req, res) => {
  const { lat, lon, studentId } = req.body;

  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) }
    });

    if (!student || !student.latitude) {
      return res.status(400).json({ message: 'Aluno sem localização.' });
    }

    const minutes = await getRealTimeEta(lat, lon, student.latitude, student.longitude);

    if (minutes !== null) {
      res.json({ minutes });
    } else {
      res.json({ minutes: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao calcular ETA' });
  }
});

export default router;

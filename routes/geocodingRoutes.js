import { Router } from "express";
import { addressToCoords, coordsToAddress } from "../services/geocodingService.js";

const router = Router();

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

export default router;

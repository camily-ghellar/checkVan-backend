import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { addressToCoords } from '../services/geocodingService.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/create', authenticateToken, async (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Apenas motoristas podem criar escolas.' });
  }

  let { name, address } = req.body;
  if (!name || !(address || location)) {
    return res.status(400).json({ message: 'Nome e endereço são obrigatórios.' });
  }

  try {
    const coords = await addressToCoords(address);
    const school = await prisma.school.create({
      data: {
        name,
        address,
        latitude: coords?.lat ? parseFloat(coords.lat) : null,
        longitude: coords?.lon ? parseFloat(coords.lon) : null
      }
    });
    res.status(201).json({ message: 'Escola criada com sucesso.', school });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar escola.', error: error.message });
  }
});

router.get('/list', authenticateToken, async (req, res) => {
  try {
    const schools = await prisma.school.findMany();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar escolas.', error: error.message });
  }
});

router.put('/update/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Apenas motoristas podem editar escolas.' });
  }

  const id = parseInt(req.params.id, 10);
  let { name, address, location } = req.body;
  address = address || location;

  try {
    let updateData = {};
    if (name) updateData.name = name;
    if (address) {
      updateData.address = address;
      const coords = await addressToCoords(address);
      updateData.latitude = coords?.lat ?? null;
      updateData.longitude = coords?.lon ?? null;
    }

    const updated = await prisma.school.update({
      where: { id },
      data: updateData
    });
    res.json({ message: 'Escola atualizada com sucesso.', school: updated });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar escola.', error: error.message });
  }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Apenas motoristas podem deletar escolas.' });
  }

  const id = parseInt(req.params.id, 10);
  try {
    await prisma.school.delete({ where: { id } });
    res.json({ message: 'Escola excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir escola.', error: error.message });
  }
});

export default router;

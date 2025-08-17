import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middlewares/auth.js";
import fetch from "node-fetch";

const router = Router();
const prisma = new PrismaClient();

router.get('/generate/:tripId', authenticateToken, async (req, res) => {
  const tripId = parseInt(req.params.tripId, 10);

  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        school: true,
        team: { include: { student_team: { include: { student: true } } } }
      }
    });

    if (!trip) return res.status(404).json({ message: 'Viagem não encontrada.' });

    const confirmed = trip.team.flatMap(t =>
      t.student_team
        .map(st => st.student)
        .filter(s => s.is_going_today && s.school_id === trip.school_id && s.latitude != null && s.longitude != null)
    );

    if (!confirmed.length) {
      return res.status(400).json({ message: 'Nenhum aluno confirmado com coordenadas.' });
    }

    const coordParts = confirmed.map(s => `${s.longitude},${s.latitude}`);

    if (trip.school.latitude == null || trip.school.longitude == null) {
      return res.status(400).json({ message: 'Escola sem coordenadas. Atualize o endereço da escola.' });
    }

    coordParts.push(`${trip.school.longitude},${trip.school.latitude}`);

    const osrmUrl = `http://router.project-osrm.org/trip/v1/driving/${coordParts.join(';')}?roundtrip=false&source=first&destination=last&overview=full&geometries=geojson`;

    const resp = await fetch(osrmUrl);
    const data = await resp.json();

    if (!resp.ok || data.code !== 'Ok') {
      return res.status(500).json({ message: 'Falha ao calcular rota OSRM.', details: data });
    }

    res.json({
      message: 'Rota calculada com sucesso.',
      geojson: data.trips[0]?.geometry, 
      stops: confirmed.map(s => ({
        id: s.id,
        name: s.name,
        lat: s.latitude,
        lon: s.longitude
      })).concat([{
        id: trip.school.id,
        name: trip.school.name,
        lat: trip.school.latitude,
        lon: trip.school.longitude
      }])
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar rota.', error: error.message });
  }
});

export default router;

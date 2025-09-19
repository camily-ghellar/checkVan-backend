import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middlewares/auth.js";
import { requireDriver } from "../middlewares/roles.js";
import { generateRoute } from "../services/geocodingService.js";

const router = Router();
const prisma = new PrismaClient();


router.get("/generate/:teamId", authenticateToken, requireDriver, async (req, res) => {

  const teamId = Number(req.params.teamId);
  const date = req.query.date ? new Date(req.query.date) : new Date();

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        school: true,
        student_team: {
          include: {
            student: { include: { presences: { where: { date } } } }
          }
        },
      },
    });

    if (!team) return res.status(404).json({ message: "Turma não encontrada." });

    const studentsGoing = team.student_team
      .map(st => st.student)
      .filter(s => s.presences[0]?.is_going ?? true);

    const start = { lat: team.starting_lat, lon: team.starting_lon };
    const end = { lat: team.school.latitude, lon: team.school.longitude };
    const waypoints = studentsGoing.map(s => ({ lat: s.latitude, lon: s.longitude }));

    const route = await generateRoute(start, waypoints, end);

    res.json({ team, studentsGoing, route });
  } catch (err) {
    res.status(500).json({ message: "Erro ao gerar rota.", error: err.message });
  }

});


export default router;

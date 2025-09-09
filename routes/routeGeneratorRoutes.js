import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middlewares/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/generate/:teamId", authenticateToken, async (req, res) => {
  const teamId = Number(req.params.teamId);
  const date = req.query.date ? new Date(req.query.date) : new Date();

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        student_team: {
          include: {
            student: {
              include: {
                presences: { where: { date } },
              },
            },
          },
        },
      },
    });

    if (!team) return res.status(404).json({ message: "Turma não encontrada." });

    const studentsGoing = team.student_team
      .map((st) => st.student)
      .filter((s) => {
        const presence = s.presences[0];
        return presence ? presence.is_going : true;
      });

    res.json({ team, studentsGoing });
  } catch (err) {
    res.status(500).json({ message: "Erro ao gerar rota.", error: err.message });
  }
});

export default router;

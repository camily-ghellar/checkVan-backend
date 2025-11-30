import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from '../middlewares/roles.js';
import { generateRoute } from '../services/geocodingService.js';

const router = Router();
const prisma = new PrismaClient();

function toDateOnlyUTC(date) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

router.get('/generate/:teamId', authenticateToken, requireDriver, async (req, res) => {
  const teamId = Number(req.params.teamId);
  
  const dateParam = req.query.date ? new Date(req.query.date) : new Date();
  const date = toDateOnlyUTC(dateParam);

  const tripType = req.query.tripType === 'RETURNING' ? 'RETURNING' : 'GOING'; 

  const currentLat = req.query.currentLat ? parseFloat(req.query.currentLat) : null;
  const currentLon = req.query.currentLon ? parseFloat(req.query.currentLon) : null;

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        school: true,
        student_team: { 
          include: { 
            student: { 
              include: { 
                presences: { where: { date } }, 
                user: true 
              } 
            } 
          } 
        }
      }
    });

    if (!team) return res.status(404).json({ message: 'Turma não encontrada.' });

    const allStudents = team.student_team.map(st => {
      const student = st.student;
      const presence = student.presences[0];
      
      let isConfirmed = null; 

      if (presence) {
        const status = presence.status;

        if (status === 'NONE') {
          isConfirmed = false;
        } else if (status === 'BOTH') {
          isConfirmed = true;
        } else if (status === 'GOING') {
          isConfirmed = (tripType === 'GOING');
        } else if (status === 'RETURNING') {
          isConfirmed = (tripType === 'RETURNING');
        }
      }

      return {
        ...student,
        isConfirmed: isConfirmed 
      };
    });

    const studentsGoing = allStudents.filter(s => s.isConfirmed !== false);

    let start = { lat: team.starting_lat, lon: team.starting_lon };

    if (currentLat !== null && currentLon !== null) {
      console.log(`Usando localização atual do motorista: ${currentLat}, ${currentLon}`);
      start = { lat: currentLat, lon: currentLon };
    }
    
    const end = { lat: team.school.latitude, lon: team.school.longitude };
    
    const waypoints = studentsGoing.map(s => ({ lat: s.latitude, lon: s.longitude }));
    
    let route = null;
    let stopsInfo = [];

    if (waypoints.length > 0) {
      route = await generateRoute(start, waypoints, end);

      if (route) {
        const now = new Date();
        let cumulativeSeconds = 0;
        
        stopsInfo = route.legs.map((leg, index) => {
          const duration = leg.duration_in_traffic?.value || leg.duration.value;
          cumulativeSeconds += duration;
          return {
            stop: index + 1,
            distance: leg.distance.text,
            duration: leg.duration.text,
            durationInTraffic: leg.duration_in_traffic?.text || leg.duration.text,
            eta: new Date(now.getTime() + cumulativeSeconds * 1000).toLocaleTimeString(),
            arrivalAddress: leg.end_address
          };
        });
      }
    }

    const responsePayload = { 
      team, 
      students: allStudents, 
      route, 
      stopsInfo 
    };

    res.json(responsePayload);

  } catch (err) {
    console.error("Erro ao gerar rota:", err);
    res.status(500).json({ message: 'Erro ao gerar rota.', error: err.message });
  }
});

export default router;

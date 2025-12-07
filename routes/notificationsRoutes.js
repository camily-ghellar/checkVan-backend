import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from '../middlewares/roles.js';
import cron from "node-cron";
import axios from "axios";

const router = Router();
const prisma = new PrismaClient();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

function toDateOnlyUTC(date) {
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  return new Date(Date.UTC(year, month, day));
}

function formatStudentNames(names) {
  const cleanNames = names.map(name => name.trim());

  if (cleanNames.length === 0) return '';
  if (cleanNames.length === 1) return cleanNames[0];
  if (cleanNames.length === 2) return `${cleanNames[0]} e ${cleanNames[1]}`;
  
  const allExceptLast = cleanNames.slice(0, -1);
  const last = cleanNames[cleanNames.length - 1];
  
  return `${allExceptLast.join(', ')} e ${last}`;
}

function getTomorrowDateOnlyUTCMinus3() {
  const now = new Date();

  const nowUTC3 = new Date(now.getTime() - 3 * 60 * 60 * 1000);

  const tomorrowUTC3 = new Date(nowUTC3);
  tomorrowUTC3.setDate(tomorrowUTC3.getDate() + 1);
  tomorrowUTC3.setHours(0, 0, 0, 0);

  return toDateOnlyUTC(tomorrowUTC3.toISOString());
}


router.post('/send-presence-reminders', authenticateToken, async (req, res) => {
  try {
    // Data da viagem — amanhã
    const dateOnly = getTomorrowDateOnlyUTCMinus3();

    // Presenças já confirmadas
    const confirmed = await prisma.student_presence.findMany({
      where: { date: dateOnly },
      select: { student_id: true },
    });

    const confirmedIds = confirmed.map(p => p.student_id);

    // Estudantes que AINDA NÃO confirmaram
    const students = await prisma.student.findMany({
      where: {
        id: { notIn: confirmedIds },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            fcm_token: true,
          }
        }
      }
    });

    // Agrupar por responsável (1 responsável → vários alunos)
    const guardiansMap = new Map();

    for (const student of students) {
      const token = student.user?.fcm_token;
      if (!token) continue;

      if (!guardiansMap.has(token)) {
        guardiansMap.set(token, {
          token,
          studentNames: []
        });
      }

      guardiansMap.get(token).studentNames.push(student.name);
    }

    // Enviar notificações agrupadas
    let sentCount = 0;

    for (const { token, studentNames } of guardiansMap.values()) {

      const formattedNames = formatStudentNames(studentNames);

      const title = '🚨 Lembrete de Presença';
      const body = `Estamos preparando a rota de amanhã. Não se esqueça de confirmar a presença de ${formattedNames}!`;

      await admin.messaging().send({
        token,
        notification: { title, body }
      });

      sentCount++;
    }

    res.json({
      message: `Lembretes enviados com sucesso para ${sentCount} responsáveis.`
    });

  } catch (err) {
    console.error("Erro ao enviar lembretes de presença:", err);
    res.status(500).json({
      message: "Erro ao enviar lembretes de presença.",
      error: err.message
    });
  }
});

cron.schedule("0 20 * * *", async () => {
  try {
    await axios.post("http://localhost:10000/student/send-presence-reminders", {}, {
      headers: {
        Authorization: `Bearer ${process.env.CRON_ADMIN_TOKEN}`
      }
    });

  } catch (err) {
    console.error("Erro ao enviar lembretes via cron:", err.message);
  }
});

router.post('/notify-proximity', authenticateToken, requireDriver, async (req, res) => {
  const { studentId, minutes } = req.body;

  if (!studentId || minutes === undefined) {
    return res.status(400).json({ message: 'studentId e minutes são obrigatórios.' });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) },
      include: { 
        user: { select: { fcm_token: true } }
      }
    });

    if (!student?.user?.fcm_token) {
      return res.status(200).json({ message: 'Usuário sem token, notificação pulada.' });
    }

    const mins = Math.max(1, Math.ceil(minutes)); 

    await admin.messaging().send({
      token: student.user.fcm_token,
      notification: {
        title: '🚐 Hora de ir pra escola',
        body: `A van está a caminho! Chegará em seu portão em aproximadamente ${mins} minutos.`
      }
    });

    res.json({ message: `Notificação de proximidade enviada para ${student.name}.` });

  } catch (err) {
    console.error('Erro ao enviar notificação de proximidade:', err);
    res.status(500).json({ message: 'Erro ao enviar notificação.', error: err.message });
  }
});

router.post('/notify-arrival-home', authenticateToken, requireDriver, async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) return res.status(400).json({ message: 'studentId é obrigatório.' });

  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) },
      include: { user: true }
    });

    if (!student?.user?.fcm_token) {
      return res.status(200).json({ message: 'Aluno sem token ou não encontrado.' });
    }

    if (student.notifiedHome) {
      return res.status(200).json({ message: 'Notificação de casa já enviada anteriormente.' });
    }

    await admin.messaging().send({
      token: student.user.fcm_token,
      notification: {
        title: 'CheckVan',
        body: `A van está chegando na casa de ${student.name}!`
      }
    });

    await prisma.student.update({
      where: { id: Number(studentId) },
      data: { notifiedHome: true }
    });

    res.json({ message: `Notificação de chegada na casa enviada para ${student.name}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao notificar chegada na casa.' });
  }
});

router.post('/notify-boarding', authenticateToken, requireDriver, async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) return res.status(400).json({ message: 'studentId é obrigatório.' });

  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(studentId) },
      include: { user: true }
    });

    if (!student?.user?.fcm_token) {
      return res.status(200).json({ message: 'Aluno sem token.' });
    }

    await admin.messaging().send({
      token: student.user.fcm_token,
      notification: {
        title: '🚸 No caminho da educação',
        body: `${student.name} já embarcou e está à caminho da escola. Acompanhe a rota pelo mapa!`
      }
    });

    await prisma.student.update({
      where: { id: Number(studentId) },
      data: { notifiedBoarding: true }
    });

    res.json({ message: `Embarque de ${student.name} registrado e notificado.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao notificar embarque.' });
  }
});

router.post('/notify-arrival-school', authenticateToken, requireDriver, async (req, res) => {
  const { teamId } = req.body;

  if (!teamId) return res.status(400).json({ message: 'teamId é obrigatório.' });

  try {
    const team = await prisma.team.findUnique({
      where: { id: Number(teamId) },
      include: {
        student_team: {
          include: {
            student: {
              include: { user: true }
            }
          }
        }
      }
    });

    if (!team) return res.status(404).json({ message: 'Turma não encontrada.' });

    let count = 0;
    const studentIdsToUpdate = team.student_team.map(st => st.student.id);

    for (const st of team.student_team) {
      const student = st.student;
      if (student.user?.fcm_token) {
        
        await admin.messaging().send({
          token: student.user.fcm_token,
          notification: {
            title: '📚 Hora de estudar',
            body: `Tio ${req.user.name} finalizou a rota. ${student.name} está na escola!`
          }
        });

        await prisma.student.update({
          where: { id: student.id },
          data: { notifiedSchool: true }
        });
        
        count++;
      }
    }
    
    if (studentIdsToUpdate.length > 0) {
      await prisma.student.updateMany({
        where: { id: { in: studentIdsToUpdate } },
        data: { 
          notifiedBoarding: false,
          notifiedHome: false, 
          notifiedSchool: true, 
        }
      });
    }

    res.json({ message: `Notificações de escola enviadas para ${count} alunos e status de rota reiniciado.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao notificar chegada na escola.' });
  }
});

const trackingClients = global.trackingClients || new Map(); 

router.post('/update-location', authenticateToken, requireDriver, async (req, res) => {
  const { teamId, lat, lon, tripType } = req.body;
  const teamIdInt = parseInt(teamId); 

  if (!teamIdInt || isNaN(teamIdInt) || !lat || !lon || !tripType) {
    return res.status(400).json({ message: 'Dados de localização incompletos.' });
  }

  try {
    const payload = JSON.stringify({ lat, lon, teamId: teamIdInt });
    
    if (global.trackingClients.has(teamIdInt)) { 
        global.trackingClients.get(teamIdInt).forEach(ws => {
            if (ws.readyState === 1) { 
                ws.send(payload);
            }
        });
    }

    return res.status(200).json({ message: 'Localização e status de embarque processados.' });

  } catch (e) {
    console.error("Erro na atualização de localização:", e);
    return res.status(500).json({ message: 'Erro interno ao processar localização.' });
  }
});

export default router;
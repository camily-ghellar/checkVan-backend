import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import { getDistance } from 'geolib';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from '../middlewares/roles.js';

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

router.post('/update-location', authenticateToken, requireDriver, async (req, res) => {
  const { teamId, lat, lon } = req.body;

  if (!teamId || !lat || !lon) {
    return res.status(400).json({ message: 'teamId, lat e lon são obrigatórios.' });
  }

  try {
    const team = await prisma.team.findUnique({
      where: { id: Number(teamId) },
      include: {
        school: true,
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

    for (const st of team.student_team) {
      const student = st.student;
      if (!student.user?.fcm_token) continue;

      const distanceToPickup = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: student.latitude, longitude: student.longitude }
      );

      //embarque
      if (distanceToPickup <= ARRIVAL_THRESHOLD && !student.notifiedBoarding) {
        await admin.messaging().send({
          token: student.user.fcm_token,
          notification: {
            title: 'CheckVan',
            body: `${student.name} embarcou na van!`
          }
        });
        await prisma.student.update({
          where: { id: student.id },
          data: { notifiedBoarding: true }
        });
      }

      //chegada na casa
      if (distanceToPickup <= ARRIVAL_THRESHOLD && !student.notifiedHome) {
        await admin.messaging().send({
          token: student.user.fcm_token,
          notification: {
            title: 'CheckVan',
            body: `A van está chegando na casa de ${student.name}!`
          }
        });
        await prisma.student.update({
          where: { id: student.id },
          data: { notifiedHome: true }
        });
      }

      //chegada na escola
      const distanceToSchool = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: team.school.latitude, longitude: team.school.longitude }
      );

      if (distanceToSchool <= ARRIVAL_THRESHOLD && !student.notifiedSchool) {
        await admin.messaging().send({
          token: student.user.fcm_token,
          notification: {
            title: 'CheckVan',
            body: `${student.name} chegou na escola!`
          }
        });
        await prisma.student.update({
          where: { id: student.id },
          data: { notifiedSchool: true }
        });
      }
    }

    res.json({ message: 'Localização processada e notificações enviadas.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar localização.', error: err.message });
  }
});

router.post('/send-presence-reminders', authenticateToken, async (req, res) => {
  try {
    const now = new Date();
    tomorrow.setUTCDate(now.getUTCDate() + 1);
    const dateOnly = toDateOnlyUTC(tomorrow);

    const confirmed = await prisma.student_presence.findMany({
      where: { date: dateOnly },
      select: { student_id: true },
    });

    const confirmedIds = confirmed.map(p => p.student_id);

    const students = await prisma.student.findMany({
      where: {
        id: { notIn: confirmedIds },
      },
      include: { 
        user: { 
          select: { name: true, fcm_token: true } 
        } 
      },
    });

    const guardiansToNotify = new Map();

    for (const student of students) {
      const fcmToken = student.user?.fcm_token;
      if (!fcmToken) continue;

      if (!guardiansToNotify.has(fcmToken)) {
        guardiansToNotify.set(fcmToken, {
          token: fcmToken,
          studentNames: []
        });
      }
      
      guardiansToNotify.get(fcmToken).studentNames.push(student.name);
    }

    let sentCount = 0;
    for (const [token, data] of guardiansToNotify.entries()) {
      
      const studentNameList = formatStudentNames(data.studentNames);
      
      const title = '🚨 Lembrete de Presença';
      const body = `Estamos preparando a rota de amanhã. Não se esqueça de confirmar a presença de ${studentNameList}!`;

      await admin.messaging().send({
        token: token,
        notification: {
          title: title,
          body: body,
        },
      });
      sentCount++;
    }

    res.json({ message: `Lembretes enviados com sucesso para ${sentCount} responsáveis.` });
  } catch (err) {
    console.error('Erro ao enviar lembretes de presença:', err);
    res.status(500).json({
      message: 'Erro ao enviar lembretes de presença.',
      error: err.message,
    });
  }
});

router.post('/notify-proximity', authenticateToken, requireDriver, async (req, res) => {
  const { studentId, minutes } = req.body;
  console.log("minutes: ", minutes);

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
  console.log("passou no /notify-arrival-school: ");

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
    
    // Use admin.messaging().sendMulticast() se tiver muitos tokens
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

    res.json({ message: `Notificações de escola enviadas para ${count} alunos.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao notificar chegada na escola.' });
  }
});

export default router;
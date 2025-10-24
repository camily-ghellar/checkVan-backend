import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import { getDistance } from 'geolib';
import authenticateToken from '../middlewares/auth.js';
import { requireDriver } from '../middlewares/roles.js';

const router = Router();
const prisma = new PrismaClient();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const ARRIVAL_THRESHOLD = 10; //10 metros

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
          include: { student: { include: { guardian: true } } }
        }
      }
    });

    if (!team) return res.status(404).json({ message: 'Turma não encontrada.' });

    for (const st of team.student_team) {
      const student = st.student;
      if (!student.guardian?.fcm_token) continue;

      //embarque na van
      const distanceToPickup = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: student.latitude, longitude: student.longitude }
      );

      if (distanceToPickup <= ARRIVAL_THRESHOLD && !student.notifiedBoarding) {
        await admin.messaging().send({
          token: student.guardian.fcm_token,
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
          token: student.guardian.fcm_token,
          notification: {
            title: 'CheckVan',
            body: `A van está chegando na casa de ${student.name}!`
          }
        });
        await prisma.student.update({ where: { id: student.id }, data: { notifiedHome: true } });
      }

      //chegada na escola
      const distanceToSchool = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: team.school.latitude, longitude: team.school.longitude }
      );

      if (distanceToSchool <= ARRIVAL_THRESHOLD && !student.notifiedSchool) {
        await admin.messaging().send({
          token: student.guardian.fcm_token,
          notification: {
            title: 'CheckVan',
            body: `${student.name} chegou na escola!`
          }
        });
        await prisma.student.update({ where: { id: student.id }, data: { notifiedSchool: true } });
      }
    }

    res.json({ message: 'Localização processada e notificações enviadas.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar localização.', error: err.message });
  }
});

export default router;

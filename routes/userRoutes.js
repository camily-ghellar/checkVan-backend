import { Router } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { createTransport } from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import authenticateToken  from '../middlewares/auth.js';
import { requireRoles } from "../middlewares/roles.js";
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cloudinary from '../cloudinary.js';

const { sign } = jwt;

const router = Router();
const prisma = new PrismaClient();
const upload = multer();

function toDateOnlyUTC(date) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function parseTime(timeStr, baseDate) {
  if (!timeStr) return null;
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

router.post('/create', async (req, res) => {
  const { name, phone, phone_country, email, password, role, driver_license, birth_date } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
  }

  if (password.length < 12) {
    return res.status(400).json({ message: 'A senha deve ter no mínimo 12 caracteres.' });
  }

  if (!['guardian', 'driver'].includes(role)) {
    return res.status(400).json({ message: 'Role inválido. Use guardian ou driver.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Já existe um usuário com este e-mail.' });
    }

    const hashedPassword = hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        phone_country,
        email,
        password: hashedPassword,
        role,
        driver_license: role === 'driver' ? driver_license : null,
        birth_date: birth_date ? new Date(birth_date) : null,
      },
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.', userId: user.id });
  } catch (err) {
    console.log("🚀 ~ err:", err);
    res.status(500).json({ message: 'Erro interno ao cadastrar usuário.', error: err.message });
  }

});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    const token = sign({ 
      id: user.id, 
      role: user.role, 
      name: user.name, 
      isTempPassword: user.is_temp_password
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login realizado com sucesso.', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno ao tentar fazer login.', error: err.message });
  }

});


router.put('/update', authenticateToken, requireRoles("guardian", "driver"), async (req, res) => {

  const { name, phone, phone_country, email, password, driver_license, birth_date } = req.body;
  const userId = req.user.id;

  try {
    const data = {};
    if (name) data.name = name;
    if (phone) data.phone = phone;
    if (phone_country) data.phone_country;
    if (email) data.email = email;
    if (driver_license) data.driver_license = driver_license;
    if (birth_date) data.birth_date = new Date(birth_date);
    if (password) data.password = hashSync(password, 10);

     if (password) {
      if (password.length < 12) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 12 caracteres.' });
      }
      
      data.password = hashSync(password, 10);
      data.is_temp_password = false; 
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data
    });

    res.json({ message: 'Informações atualizadas com sucesso.', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar informações.', error: err.message });
  }

});


router.post('/recoverPassword', async (req, res) => {

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'E-mail é obrigatório.' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = hashSync(tempPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        password: hashedPassword,
        is_temp_password: true
     },
    });

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recupere sua senha - CheckVan Van Escolar',
      text: `Sua senha provisória é: ${tempPassword}\n\nUse-a para acessar sua conta e troque-a em seguida.`,
    });

    res.json({ message: 'Senha provisória enviada para o e-mail de login.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao recuperar senha.', error: err.message });
  }

});


router.get('/getProfile', authenticateToken, requireRoles("guardian", "driver"), async (req, res) => {

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        phone: true,
        phone_country: true,
        email: true,
        role: true,
        driver_license: true,
        birth_date: true,
        is_temp_password: true,
        image_profile: true,
      },
    });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.', error: err.message });
  }

});

function getStudentNextTripStatus(
  student,
  now,
  presenceMap,
  todayBase,
  todayUTC,
  tomorrowUTC,
  isWeekend,        
  nextBusinessDayUTC 
) {
  const { school } = student;
  const team = student.student_team[0]?.team;

  if (!school || !team) {
    return {
      studentId: student.id,
      name: student.name,
      status: 'ERROR',
      message: 'Aluno sem escola ou turma configurada.',
      trip: null,
    };
  }

  const morningLimit = parseTime(school.morning_limit, todayBase);
  const afternoonLimit = parseTime(school.afternoon_limit, todayBase);

  if (!morningLimit || !afternoonLimit) {
    return {
      studentId: student.id,
      name: student.name,
      status: 'ERROR',
      message: 'Horários da escola não configurados.',
      trip: null,
    };
  }

  let targetDateUTC;
  let targetDateISO; 
  let tripType;
  let tripTime;

  if (isWeekend) {
    tripType = 'GOING';
    tripTime = team.departure_time_going;
    targetDateUTC = nextBusinessDayUTC;
    targetDateISO = nextBusinessDayUTC.toISOString().slice(0, 10);
  } else {
    if (now < morningLimit) {
      tripType = 'GOING';
      tripTime = team.departure_time_going;
      targetDateUTC = todayUTC;
      targetDateISO = todayUTC.toISOString().slice(0, 10);
    } else if (now < afternoonLimit) {
      tripType = 'RETURNING';
      tripTime = team.departure_time_return;
      targetDateUTC = todayUTC;
      targetDateISO = todayUTC.toISOString().slice(0, 10);
    } else {
      tripType = 'GOING';
      tripTime = team.departure_time_going;
      targetDateUTC = tomorrowUTC;
      targetDateISO = tomorrowUTC.toISOString().slice(0, 10);
    }
  }

  if (!tripTime) {
    return {
      studentId: student.id,
      name: student.name,
      status: 'ERROR',
      message: `Horário de partida (${tripType}) não definido para a turma.`,
      trip: null,
    };
  }

  const tripInfo = {
    type: tripType,
    date: targetDateUTC, 
    departureTime: tripTime, 
  };

  if (!isWeekend && student.notifiedBoarding) {
    return {
      studentId: student.id,
      name: student.name,
      status: 'EM_ROTA',
      message: 'Seu filho(a) já embarcou e está a caminho!',
      trip: tripInfo,
    };
  }

  const presenceKey = `${student.id}-${targetDateISO}`;
  const presenceStatus = presenceMap.get(presenceKey); 

  if (!presenceStatus) {
    return {
      studentId: student.id,
      name: student.name,
      status: 'AGUARDANDO_CONFIRMACAO',
      message: 'Por favor, confirme a presença para esta viagem.',
      trip: tripInfo,
    };
  }

  const isNotGoing =
    presenceStatus === 'NONE' ||
    (tripType === 'GOING' && presenceStatus === 'RETURNING') ||
    (tripType === 'RETURNING' && presenceStatus === 'GOING');

  if (isNotGoing) {
    return {
      studentId: student.id,
      name: student.name,
      status: 'NAO_VAI',
      message: 'Viagem não programada ou cancelada.',
      trip: tripInfo,
    };
  }

  return {
    studentId: student.id,
    name: student.name,
    status: 'AGUARDANDO_OUTROS',
    message: 'Presença confirmada. Aguardando o horário de partida.',
    trip: tripInfo,
  };
}

async function getTrackingDataForStudent(studentInRoute) {
    if (!studentInRoute || studentInRoute.status !== 'EM_ROTA') return null;

    const student = studentInRoute.student;
    const teamAssignment = student.student_team.find(st => st.team_id);
    
    if (!teamAssignment) return null;
    
    const team = await prisma.team.findUnique({
        where: { id: teamAssignment.team_id },
        select: { 
            id: true, 
            name: true, 
            van: { select: { plate: true } } 
        }
    });

    if (!team || !student.latitude || !student.longitude) return null;

    return {
        teamId: team.id,
        teamName: team.name,
        studentLat: student.latitude,
        studentLon: student.longitude,
        vanPlate: team.van?.plate || null,
    };
}

/**
 * POST /guardian/next-trip-status-bulk
 * Pega o status da próxima viagem para uma lista de alunos.
 * Corpo: { "studentIds": [1, 2, 3] }
 *
 * RETORNO SIMPLIFICADO:
 * { "status": "EM_ROTA" | "AGUARDANDO_CONFIRMACAO" | "AGUARDANDO_OUTROS" | "NAO_VAI" | "SEM_ALUNO" }
 */
router.post(
  '/guardian/next-trip-status-bulk',
  authenticateToken,
  requireRoles('guardian'),
  async (req, res) => {
    const { studentIds } = req.body;
    const guardianId = req.user.id; // ID do guardião logado

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      // Se não há alunos, não há viagem
      return res.json({ status: 'SEM_ALUNO' });
    }

    const studentIdsInt = studentIds.map((id) => parseInt(id, 10));
    const now = new Date(2025, 11, 8, 4, 10, 0, 0);
    // const now = new Date();

    const dayOfWeek = now.getDay(); 
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const todayBase = new Date();
    todayBase.setHours(0, 0, 0, 0); 
    const tomorrowBase = new Date(todayBase);
    tomorrowBase.setDate(tomorrowBase.getDate() + 1);

    const todayUTC = toDateOnlyUTC(todayBase);
    const tomorrowUTC = toDateOnlyUTC(tomorrowBase);

    let nextBusinessDayUTC = null;
    let datesToFetch = [todayUTC, tomorrowUTC];

    if (isWeekend) {
      const nextBusinessDay = new Date(todayBase);
      const daysToAdd = dayOfWeek === 0 ? 1 : 2;
      nextBusinessDay.setDate(nextBusinessDay.getDate() + daysToAdd);
      
      nextBusinessDayUTC = toDateOnlyUTC(nextBusinessDay);
      datesToFetch = [nextBusinessDayUTC];
    }

    try {
      const students = await prisma.student.findMany({
        where: {
          id: { in: studentIdsInt },
          guardian_id: guardianId, 
        },
        include: {
          school: true,
          student_team: {
            include: { team: true },
          },
        },
      });

      const foundStudentIds = students.map((s) => s.id);
      if (foundStudentIds.length === 0) {
        return res.json({ status: 'NAO_VAI' });
      }

      const presences = await prisma.student_presence.findMany({
        where: {
          student_id: { in: foundStudentIds },
          date: { in: datesToFetch }, 
        },
      });

      const presenceMap = new Map();
      for (const p of presences) {
        const isoDate = p.date.toISOString().slice(0, 10);
        const key = `${p.student_id}-${isoDate}`;
        presenceMap.set(key, p.status);
      }

      const results = students.map((student) => {
        const statusResult = getStudentNextTripStatus(
          student,
          now,
          presenceMap,
          todayBase,
          todayUTC,
          tomorrowUTC,
          isWeekend,        
          nextBusinessDayUTC 
        );
        return { 
          ...statusResult, 
          student: student, 
        };
      });

      const statuses = results.map((r) => r.status);

      const resultInRoute = results.find(r => r.status === 'EM_ROTA');
      let activeTripData = null;

      if (statuses.includes('EM_ROTA') && resultInRoute) {
        
        const student = resultInRoute.student;
        const teamAssignment = student.student_team[0];
        const team = teamAssignment?.team;

        if (student.latitude && student.longitude && team) {
            activeTripData = {
                teamId: team.id,
                teamName: team.name,
                studentLat: student.latitude, 
                studentLon: student.longitude,
            };
        }
        
        return res.json({ status: 'EM_ROTA', activeTripData });
      }

      if (statuses.includes('AGUARDANDO_CONFIRMACAO')) {
        return res.json({ status: 'AGUARDANDO_CONFIRMACAO' });
      }

      const isWaiting = statuses.includes('AGUARDANDO_OUTROS');
      const allConfirmed = statuses.every(
        (s) => s === 'AGUARDANDO_OUTROS' || s === 'NAO_VAI' || s === 'ERROR'
      );

      if (isWaiting && allConfirmed) {
        return res.json({ status: 'AGUARDANDO_OUTROS' });
      }
      
      return res.json({ status: 'NAO_VAI' });
      
    } catch (error) {
      console.error('Erro ao buscar status de múltiplas viagens:', error);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
);

router.post('/save-fcm-token', authenticateToken, async (req, res) => {
  const { fcm_token } = req.body;
  const userId = req.user.id;

  if (!fcm_token) {
    return res.status(400).json({ message: 'fcm_token é obrigatório.' });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { fcm_token: fcm_token },
    });
    res.json({ message: 'Token FCM salvo com sucesso.' });
  } catch (err) {
    console.error('Erro ao salvar FCM token:', err);
    res.status(500).json({ message: 'Erro ao salvar token.', error: err.message });
  }
});

router.post('/upload-image', authenticateToken, upload.single('image_profile'), async (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
  }

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'user_profiles',
            public_id: `user_${userId}`,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('Falha no upload.'));
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
    };

    const uploadResult = await uploadToCloudinary();
    const imageUrl = uploadResult.secure_url;

    // Salva URL no banco
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image_profile: imageUrl },
    });

    res.json({ message: 'Foto de perfil atualizada.', imageUrl });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ message: 'Erro ao salvar imagem.', error: err.message });
  }
});

router.post('/refresh-token', authenticateToken, async (req, res) => {
  try {
    const user = req.user; 

    const newToken = sign({ 
      id: user.id, 
      role: user.role, 
      name: user.name, 
      isTempPassword: user.isTempPassword
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Token renovado.', token: newToken });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao renovar token.', error: err.message });
  }
});

export default router;

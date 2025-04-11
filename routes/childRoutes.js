// const express = require('express');
// const router = express.Router();
// const prisma = require('../prisma'); 
//const authenticateToken = require('./middlewares/auth');
//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient();

// router.post('/child/registration', authenticateToken, async (req, res) => {
//   const { driver_id, child_name, birth_date, school, starting_point, destination } = req.body;

//   try {
//     const child = await prisma.children.create({
//       data: {
//         child_name,
//         starting_point,
//         destination,
//         birth_date: birth_date ? new Date(birth_date) : undefined,
//         school,
//         guardian_id: req.userId,
//         driver_id,
//       },
//     });

//     res.status(201).json({ message: 'Criança cadastrada com sucesso', child });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erro ao cadastrar criança', error: error.message });
//   }
// });
//export default router;


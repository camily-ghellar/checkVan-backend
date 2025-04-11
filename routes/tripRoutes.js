// const express = require('express');
// const prisma = require('../prisma');
//const authenticateToken = require('./middlewares/auth');


// const router = express.Router();

// router.post('/trip/registration', authenticateToken, async (req, res) => {
//     const { trip_date, departure_time, arrival_time } = req.body;
//     const driver_id = req.userId;
  
//     try {
//       const children = await prisma.children.findMany({
//         where: { driver_id },
//         select: { id: true },
//       });
  
//       if (children.length === 0) {
//         return res.status(400).json({ message: 'Nenhuma criança vinculada a este motorista' });
//       }
  
//       const trip = await prisma.trips.create({
//         data: {
//           driver_id,
//           children_ids: children.map(c => c.id),
//           trip_date: trip_date ? new Date(trip_date) : undefined,
//           departure_time: departure_time ? new Date(`1970-01-01T${departure_time}`) : undefined,
//           arrival_time: arrival_time ? new Date(`1970-01-01T${arrival_time}`) : undefined,
//         },
//       });
  
//       res.status(201).json({ message: 'Viagem cadastrada com sucesso', trip });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Erro ao cadastrar viagem', error: err.message });
//     }
//   });
  //export default router;

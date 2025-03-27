// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('./db-connection');  

// const app = express();
// app.use(express.json());

// // const authenticateToken = (req, res, next) => {
// //   const token = req.headers['authorization'];
// //   if (!token) return res.status(401).json({ message: 'Token não fornecido' });

// //   jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
// //     if (err) return res.status(403).json({ message: 'Token inválido' });
// //     req.userId = user.id; 
// //     next();
// //   });
// // };
// // app.post('/trip/registration', authenticateToken, async (req, res) => {
// //   const { trip_date, departure_time, arrival_time } = req.body;
// //   const driver_id = req.userId; 

// //   try {
// //     const childrenQuery = 'SELECT id FROM children WHERE driver_id = $1';
// //     const childrenResult = await pool.query(childrenQuery, [driver_id]);

// //     if (childrenResult.rows.length === 0) {
// //       return res.status(400).json({ message: 'Nenhuma criança vinculada a este motorista' });
// //     }

// //     const tripQuery = 'INSERT INTO trips (driver_id, children_ids, trip_date, departure_time, arrival_time) VALUES ($1, $2, $3, $4, $5) RETURNING id';
// //     let tripIds = [];

// //     for (const child of childrenResult.rows) {
// //       const tripResult = await pool.query(tripQuery, [driver_id, child.id, departure_time, arrival_time]);
// //       tripIds.push(tripResult.rows[0].id);
// //     }

// //     res.status(201).json({ message: 'Viagem cadastrada com sucesso', tripIds });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Erro ao cadastrar viagem', error: err.message });
// //   }
// // });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
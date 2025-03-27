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

// // app.post('/child/registration', authenticateToken, async (req, res) => {
// //   const { driver_id, child_name, birth_date, school } = req.body;
// //   const guardian_id = req.userId; 

// //   const query = 'INSERT INTO children (guardian_id, driver_id, child_name, birth_date, school) VALUES ($1, $2, $3, $4, $5) RETURNING id';

// //   try {
// //     const result = await pool.query(query, [guardian_id, driver_id, child_name, birth_date, school]);
// //     const childId = result.rows[0].id;
// //     res.status(201).json({ message: 'Criança cadastrada com sucesso', id: childId });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Erro ao cadastrar criança', error: err.message });
// //   }
// // });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
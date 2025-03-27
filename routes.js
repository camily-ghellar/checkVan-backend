const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db-connection');  

const app = express();
app.use(express.json());


app.post('/guardian/registration', async (req, res) => {
  const { guardian_name, phone, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO guardians (guardian_name, phone, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
  
  try {
    const result = await pool.query(query, [guardian_name, phone, email, hashedPassword]);
    const guardianId = result.rows[0].id;
    res.status(201).json({ message: 'Responsável cadastrado com sucesso', id: guardianId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar responsável', error: err.message });
  }
});

app.post('/guardian/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM guardians WHERE email = $1';
  
  try {
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'E-mail não encontrado' });
    }

    const guardian = result.rows[0];
    if (bcrypt.compareSync(password, guardianId.password)) {
      const token = jwt.sign({ id: guardian.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido', token });
    } else {
      res.status(400).json({ message: 'Senha incorreta' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao verificar login', error: err.message });
  }
});

app.post('/driver/registration', async (req, res) => {
  const { driver_name, phone, email, password, driver_license } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO drivers (driver_name, phone, email, password, driver_license) VALUES ($1, $2, $3, $4, $5) RETURNING id';

  try {
    const result = await pool.query(query, [driver_name, phone, email, hashedPassword, driver_license]);
    const driverId = result.rows[0].id;
    res.status(201).json({ message: 'Motorista cadastrado com sucesso', id: driverId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar motorista', error: err.message });
  }
});

app.post('/driver/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM drivers WHERE email = $1';

  try {
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'E-mail não encontrado' });
    }

    const driver = result.rows[0];
    if (bcrypt.compareSync(password, driver.password)) {
      const token = jwt.sign({ id: driver.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido', token });
    } else {
      res.status(400).json({ message: 'Senha incorreta' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao verificar login', error: err.message });
  }
});


// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ message: 'Token não fornecido' });

//   jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Token inválido' });
//     req.userId = user.id; 
//     next();
//   });
// };

// app.post('/child/registration', authenticateToken, async (req, res) => {
//   const { driver_id, child_name, birth_date, school } = req.body;
//   const guardian_id = req.userId; 

//   const query = 'INSERT INTO children (guardian_id, driver_id, child_name, birth_date, school) VALUES ($1, $2, $3, $4, $5) RETURNING id';

//   try {
//     const result = await pool.query(query, [guardian_id, driver_id, child_name, birth_date, school]);
//     const childId = result.rows[0].id;
//     res.status(201).json({ message: 'Criança cadastrada com sucesso', id: childId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Erro ao cadastrar criança', error: err.message });
//   }
// });

// app.post('/trip/registration', authenticateToken, async (req, res) => {
//   const { trip_date, departure_time, arrival_time } = req.body;
//   const driver_id = req.userId; 

//   try {
//     const childrenQuery = 'SELECT id FROM children WHERE driver_id = $1';
//     const childrenResult = await pool.query(childrenQuery, [driver_id]);

//     if (childrenResult.rows.length === 0) {
//       return res.status(400).json({ message: 'Nenhuma criança vinculada a este motorista' });
//     }

//     const tripQuery = 'INSERT INTO trips (driver_id, children_ids, trip_date, departure_time, arrival_time) VALUES ($1, $2, $3, $4, $5) RETURNING id';
//     let tripIds = [];

//     for (const child of childrenResult.rows) {
//       const tripResult = await pool.query(tripQuery, [driver_id, child.id, departure_time, arrival_time]);
//       tripIds.push(tripResult.rows[0].id);
//     }

//     res.status(201).json({ message: 'Viagem cadastrada com sucesso', tripIds });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Erro ao cadastrar viagem', error: err.message });
//   }
// });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

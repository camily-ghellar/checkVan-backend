const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db-connection');  

const app = express();
app.use(express.json());

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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
});
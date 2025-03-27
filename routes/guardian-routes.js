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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
});
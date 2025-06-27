import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import studentTeamRoutes from './routes/studentTeamRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/student', studentRoutes);
app.use('/trip', tripRoutes);
app.use('/team', teamRoutes);
app.use('/studentTeam', studentTeamRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

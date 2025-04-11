import dotenv from 'dotenv';
import express from 'express';
import driverRoutes from './routes/driverRoutes.js';
import guardianRoutes from './routes/guardianRoutes.js';
//import childRoutes from './routes/childRoutes.js';
//import tripRoutes from './routes/tripRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/driver', driverRoutes);
app.use('/guardian', guardianRoutes);
//app.use('/child', childRoutes);
//app.use('/trip', tripRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

import dotenv from 'dotenv';
import express from 'express';
import { WebSocketServer } from 'ws'; 
import jwt from 'jsonwebtoken';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import geocodingRoutes from "./routes/geocodingRoutes.js";
import routeGeneratorRoutes from './routes/routeGeneratorRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import vanRoutes from './routes/vanRoutes.js';
import utilsRoutes from './routes/utilsRoutes.js';

dotenv.config();

global.trackingClients = new Map();

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/student', studentRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/team', teamRoutes);
app.use("/geocoding", geocodingRoutes);
app.use("/routeGenerator", routeGeneratorRoutes);
app.use("/school", schoolRoutes);
app.use("/trip", tripRoutes);
app.use("/van", vanRoutes);
app.use("/utils", utilsRoutes);

const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));

const wss = new WebSocketServer({ 
    server, 
    path: '/tracking' 
});

wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const teamIdStr = url.searchParams.get('teamId');

    if (!token || !teamIdStr) {
        ws.send(JSON.stringify({ error: 'Token ou Team ID ausente.' }));
        return ws.close(1008, 'Dados de autenticação ausentes');
    }

    let teamId = parseInt(teamIdStr);
    let userId = null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id; 
    } catch (err) {
        return ws.close(1008, 'Token inválido ou expirado.');
    }

    if (isNaN(teamId)) {
        return ws.close(1008, 'Team ID inválido.');
    }
    
    console.log(`WS: Usuário ${userId} inscrito para rastrear Team ID: ${teamId}`);

    if (!global.trackingClients.has(teamId)) {
        global.trackingClients.set(teamId, new Set());
    }
    global.trackingClients.get(teamId).add(ws);

    ws.on('close', () => {
        if (global.trackingClients.has(teamId)) {
            global.trackingClients.get(teamId).delete(ws);
            if (global.trackingClients.get(teamId).size === 0) {
                global.trackingClients.delete(teamId);
            }
        }
        console.log(`WS: Cliente desconectado. Team ID ${teamId}.`);
    });

    ws.on('error', (err) => {
        console.error(`WS Error for Team ${teamId}:`, err);
    });
});
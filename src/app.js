import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import dataRoutes from './routes/data.routes.js'
import {/*publishMessage,*/ connectMQTT} from './services/mqtt.services.js'

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use('/api', dataRoutes);

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


connectMQTT();
//publishMessage('data/sensors', 'on');

export default app;
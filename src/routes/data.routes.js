import { Router } from 'express';
import { getGaugeData, getPlotData } from '../controllers/data.controller.js';

const router = Router();

router.get('/gaugedata', getGaugeData);

router.get('/plotdata', getPlotData);

export default router;
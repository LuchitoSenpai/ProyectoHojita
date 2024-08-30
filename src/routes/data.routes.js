import { Router } from 'express';
import { getGaugeData, getPdf, getPlotData, getReportData, saveGraphs, getGraph, clearGraphs } from '../controllers/data.controller.js';

const router = Router();

router.get('/gaugedata', getGaugeData);

router.get('/plotdata', getPlotData);

router.get('/getpdf', getPdf);

router.post('/getrepdata', getReportData);

router.post('/savegraph', saveGraphs);

router.get('/getgraph', getGraph);

router.delete('/cleargraphs', clearGraphs);

export default router;
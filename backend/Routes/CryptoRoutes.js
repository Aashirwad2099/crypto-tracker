import express from 'express';
import { getCurrentCoins, getHistoryData, triggerHistoryDataFetch } from '../controller/Crypto.js';

const router = express.Router();

router.get('/coins', getCurrentCoins);
router.post('/history', triggerHistoryDataFetch);
router.get('/history/:coinId', getHistoryData);

export default router;
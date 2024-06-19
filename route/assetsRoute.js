import express from 'express';
import { listAssets } from '../controller/assetsController.js';
import { getToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/assets', getToken, listAssets);

export default router;

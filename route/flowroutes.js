import express from 'express';
import { postTriggerFlow } from '../controller/flowcontroller.js';

const router = express.Router();

router.post('/trigger-flow', postTriggerFlow);

export default router;

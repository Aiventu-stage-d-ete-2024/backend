import express from 'express';
import { getOrders, postOrder } from '../controller/ordercontroller.js';

const router = express.Router();

router.get('/orders', getOrders);
router.post('/orders', postOrder);

export default router;

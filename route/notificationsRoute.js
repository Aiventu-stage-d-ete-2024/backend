import express from 'express';
import { getNotifications,
         createNotification } 
         from '../controller/notificationsController.js';

const router = express.Router();

router.get('/', getNotifications);
router.post('/', createNotification);

export default router;

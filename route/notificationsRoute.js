import express from 'express';
import { getNotifications,
         postNotification } 
         from '../controller/notificationsController.js';

const router = express.Router();

router.get('/', getNotifications);
router.post('/', postNotification);

export default router;

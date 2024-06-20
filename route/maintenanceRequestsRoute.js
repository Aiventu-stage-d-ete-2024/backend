import express from 'express';
//import { getToken } from '../middleware/auth.js';
import { getAllMaintenanceRequests, 
         createMaintenanceRequest, 
         getMaintenanceRequestById, 
         updateMaintenanceRequest } from '../controller/maintenanceRequestsController.js';

const router = express.Router();

router.get('/', getAllMaintenanceRequests);
router.post('/', createMaintenanceRequest);
router.get('/:id', getMaintenanceRequestById);
router.put('/:id', updateMaintenanceRequest);

export default router;

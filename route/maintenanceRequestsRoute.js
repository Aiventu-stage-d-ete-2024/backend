import express from 'express';
//import { getToken } from '../middleware/auth.js';
import { getAllMaintenanceRequests, 
         createMaintenanceRequest, 
         getMaintenanceRequestByRequestID, 
         updateMaintenanceRequest,
         deleteRequest } from '../controller/maintenanceRequestsController.js';

const router = express.Router();

router.get('/', getAllMaintenanceRequests);
router.post('/', createMaintenanceRequest);
router.get('/:RequestID', getMaintenanceRequestByRequestID);
router.put('/:id', updateMaintenanceRequest);
router.delete('/:id', deleteRequest);

export default router;

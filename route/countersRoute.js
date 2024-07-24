import express from 'express';
//import { getToken } from '../middleware/auth.js';
import { getAllCounters, 
         createCounter, 
         getCounterByCounterID, 
         updateCounter,
         deleteCounter} from '../controller/countersController.js';

const router = express.Router();

router.get('/', getAllCounters);
router.post('/', createCounter);
router.get('/:CounterID', getCounterByCounterID);
router.put('/:id', updateCounter);
router.delete('/:id', deleteCounter);

export default router;

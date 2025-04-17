import express from 'express';
import {
    postToDynamics,
    getFromDynamics,
} from '../controller/dynamicsController.js';

const router = express.Router();

router.post('/:entity', postToDynamics);
router.get('/:entity', getFromDynamics);

export default router;

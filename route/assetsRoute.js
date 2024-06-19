import express from 'express';
//import { getToken } from '../middleware/auth.js';
import { getAllAssets, 
         createAsset, 
         getAssetById, 
         updateAsset } from '../controller/assetsController.js';

const router = express.Router();

router.get('/', getAllAssets);
router.post('/', createAsset);
router.get('/:id', getAssetById);
router.put('/:id', updateAsset);

export default router;

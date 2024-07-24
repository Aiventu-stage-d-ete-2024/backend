import express from 'express';
//import { getToken } from '../middleware/auth.js';
import { getAllAssets, 
         createAsset, 
         getAssetByAssetID, 
         updateAsset,
         deleteAsset,
         searchAssets } from '../controller/assetsController.js';

const router = express.Router();

router.get('/', getAllAssets);
router.post('/', createAsset);
router.get('/:AssetID', getAssetByAssetID);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);
router.get('/search', searchAssets);

export default router;

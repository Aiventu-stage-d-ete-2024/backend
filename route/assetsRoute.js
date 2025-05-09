import express from 'express';
//import { getToken } from '../middleware/auth.js';
import { getAllAssets, 
         createAsset, 
         getAssetByAssetID, 
         updateAsset,
         deleteAsset,
         searchAssets,
         //syncAssets,
         //getModifiedAssets,
         } from '../controller/assetsController.js';

const router = express.Router();

router.get('/search', searchAssets);
//router.get('/modified', getModifiedAssets);
router.get('/', getAllAssets);
//router.post('/sync', syncAssets);
router.post('/', createAsset);
router.get('/:AssetID', getAssetByAssetID);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

export default router;

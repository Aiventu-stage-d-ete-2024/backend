/* import express from 'express';
//import { getToken } from '../middleware/auth.js';
import { getAllAssets, 
         createAsset, 
         getAssetByAssetID, 
         updateAsset,
         deleteAsset,
         searchAssets,
         syncDAssetsFromD365} from '../controller/dAssetsController.js';

const router = express.Router();

router.get('/search', searchAssets);
router.get('/', getAllAssets);
router.post('/', createAsset);
router.get('/:AssetID', getAssetByAssetID);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);
router.post('/sync', syncDAssetsFromD365);



export default router;
 */
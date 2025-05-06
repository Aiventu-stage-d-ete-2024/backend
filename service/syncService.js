/* import DAssets from '../model/dAssetsModel.js';
import { getAssetsFromD365, getAccessToken } from './dynamicsService.js';
import { createNotification as createNotificationUtil } from '../middleware/createNotification.js';

export async function syncAssets() {
    try {
        console.log('Starting assets synchronization with Dynamics 365...');
        
        // Get assets from Dynamics 365
        const d365Assets = await getAssetsFromD365();
        
        // Prepare bulk operations for MongoDB
        const bulkOps = d365Assets.map(asset => ({
            updateOne: {
                filter: { AssetID: asset.AssetID },
                update: { 
                    $set: {
                        ...asset,
                        lastSyncedWithD365: new Date(),
                        syncStatus: 'synced'
                    }
                },
                upsert: true
            }
        }));

        // Execute bulk write
        const result = await DAssets.bulkWrite(bulkOps);
        
        // Mark failed syncs
        await DAssets.updateMany(
            { 
                lastSyncedWithD365: { $ne: new Date() },
                syncStatus: { $ne: 'synced' }
            },
            { 
                $set: { 
                    syncStatus: 'failed',
                    syncError: 'Synchronization missed in last cycle'
                } 
            }
        );

        console.log(`Synchronization completed. Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
        await createNotificationUtil(`Assets synchronized with D365. Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
        
        return result;
    } catch (error) {
        console.error('Error during synchronization:', error);
        await createNotificationUtil(`Asset synchronization failed: ${error.message}`);
        throw error;
    }
}

export async function pushLocalChangesToD365() {
    try {
        console.log('Pushing local changes to Dynamics 365...');
        const accessToken = await getAccessToken();
        
        // Get assets with pending changes
        const pendingAssets = await DAssets.find({ 
            $or: [
                { syncStatus: 'pending' },
                { syncStatus: 'failed' }
            ]
        });
        
        let successCount = 0;
        let errorCount = 0;
        
        // Process each asset
        for (const asset of pendingAssets) {
            try {
                if (asset.syncStatus === 'pending') {
                    // New asset - create in D365
                    await createAssetInD365(asset.toObject());
                } else {
                    // Existing asset - update in D365
                    await updateAssetInD365(asset.AssetID, asset.toObject());
                }
                
                // Mark as synced
                await DAssets.findByIdAndUpdate(asset._id, {
                    syncStatus: 'synced',
                    lastSyncedWithD365: new Date(),
                    syncError: null
                });
                
                successCount++;
            } catch (error) {
                console.error(`Error syncing asset ${asset.AssetID}:`, error);
                await DAssets.findByIdAndUpdate(asset._id, {
                    syncStatus: 'failed',
                    syncError: error.message
                });
                errorCount++;
            }
        }
        
        console.log(`Push completed. Success: ${successCount}, Errors: ${errorCount}`);
        await createNotificationUtil(`Local changes pushed to D365. Success: ${successCount}, Errors: ${errorCount}`);
        
        return { successCount, errorCount };
    } catch (error) {
        console.error('Error pushing changes to D365:', error);
        await createNotificationUtil(`Push to D365 failed: ${error.message}`);
        throw error;
    }
} */
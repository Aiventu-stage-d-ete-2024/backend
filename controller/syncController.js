/* import { syncAssets, pushLocalChangesToD365 } from '../service/syncService.js';

export async function manualSync(req, res) {
    try {
        const syncResult = await syncAssets();
        res.status(200).json({
            message: 'Synchronization completed successfully',
            result: syncResult
        });
    } catch (error) {
        res.status(500).json({
            message: 'Synchronization failed',
            error: error.message
        });
    }
}

export async function manualPush(req, res) {
    try {
        const pushResult = await pushLocalChangesToD365();
        res.status(200).json({
            message: 'Push to D365 completed',
            result: pushResult
        });
    } catch (error) {
        res.status(500).json({
            message: 'Push to D365 failed',
            error: error.message
        });
    }
} */
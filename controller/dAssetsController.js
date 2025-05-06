/* import DAssets from '../model/dAssetsModel.js';
import { createNotification as createNotificationUtil } from '../middleware/createNotification.js';
import { getAccessToken } from './dynamicsController.js';
import axios from 'axios';

const { RESOURCE_URL } = process.env;

export async function getAllAssets(req, res) {
    try {
        const assets = await DAssets.find();
        res.status(200).json({ assets });
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function createAsset(req, res) {
    try {
        // Create in MongoDB
        const newAsset = await DAssets.create(req.body);
        
        // Sync to Dynamics 365
        try {
            const accessToken = await getAccessToken();
            await axios.post(`${RESOURCE_URL}/data/${process.env.ENTITY_ASSET_OBJECT}`, newAsset.toObject(), {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
        } catch (d365Error) {
            console.error('Error syncing to Dynamics 365:', d365Error);
            // Continue even if sync fails
        }
        
        await createNotificationUtil(`New asset created: ${newAsset.AssetID}`);
        res.status(201).json(newAsset);
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function getAssetByAssetID(req, res) {
    try {
        const { AssetID } = req.params;
        const asset = await DAssets.findOne({ AssetID: AssetID });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        console.error('Error fetching asset by AssetID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function updateAsset(req, res) {
    try {
        const { id } = req.params;
        const updatedAsset = await DAssets.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAsset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        
        // Sync to Dynamics 365
        try {
            const accessToken = await getAccessToken();
            await axios.patch(`${RESOURCE_URL}/data/${process.env.ENTITY_ASSET_OBJECT}(${updatedAsset.AssetID})`, updatedAsset.toObject(), {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
        } catch (d365Error) {
            console.error('Error syncing to Dynamics 365:', d365Error);
            // Continue even if sync fails
        }
        
        await createNotificationUtil(`Asset updated: ${updatedAsset.AssetID}`);
        res.status(200).json(updatedAsset);
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function deleteAsset(req, res) {
    try {
        const { id } = req.params;
        const deletedAsset = await DAssets.findByIdAndDelete(id);
        if (!deletedAsset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        
        // Sync to Dynamics 365
        try {
            const accessToken = await getAccessToken();
            await axios.delete(`${RESOURCE_URL}/data/${process.env.ENTITY_ASSET_OBJECT}(${deletedAsset.AssetID})`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
        } catch (d365Error) {
            console.error('Error syncing to Dynamics 365:', d365Error);
            // Continue even if sync fails
        }
        
        await createNotificationUtil(`Asset deleted: ${deletedAsset.AssetID}`);
        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function searchAssets(req, res) {
    try {
        const { query } = req.query;

        if (!query || query.trim() === '') {
            // Get all assets from Dynamics 365 when no query is provided
            try {
                const accessToken = await getAccessToken();
                const response = await axios.get(`${RESOURCE_URL}/data/${process.env.ENTITY_ASSET_OBJECT}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                    }
                });
                
                // Optionally sync these to MongoDB
                const d365Assets = response.data.value;
                const bulkOps = d365Assets.map(asset => ({
                    updateOne: {
                        filter: { AssetID: asset.AssetID },
                        update: { $set: asset },
                        upsert: true
                    }
                }));
                
                await DAssets.bulkWrite(bulkOps);
                
                return res.status(200).json(d365Assets);
            } catch (d365Error) {
                console.error('Error fetching from Dynamics 365:', d365Error);
                // Fall back to MongoDB if D365 fails
                const allDAssets = await DAssets.find();
                return res.status(200).json(allDAssets);
            }
        }

        // Existing search logic when query is provided
        const searchRegex = new RegExp(query, 'i');
        const numericQuery = !isNaN(query) ? Number(query) : null;

        const orConditions = [
            { AssetID: searchRegex },
            { Name: searchRegex },
            { Parent: searchRegex },
            { AssetType: searchRegex },
            { Manufacturer: searchRegex },
            { Model: searchRegex },
            { CustomerAccount: searchRegex },
            { FunctionalLocation: searchRegex },
            { CurrentLifecycleState: searchRegex },
        ];

        if (numericQuery !== null) {
            orConditions.push(
                { NumberOfChildren: numericQuery },
                { Criticality: numericQuery }
            );
        }

        const assets = await DAssets.find({ $or: orConditions });

        return res.status(200).json(assets);
    } catch (error) {
        console.error('Error searching assets:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function syncDAssetsFromD365(req, res) {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`${RESOURCE_URL}/data/${process.env.ENTITY_ASSET_OBJECT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Accept': 'application/json',
            }
        });

        const d365DAssets = response.data.value;
        
        // Upsert all assets
        const bulkOps = d365DAssets.map(asset => ({
            updateOne: {
                filter: { AssetID: asset.AssetID },
                update: { $set: asset },
                upsert: true
            }
        }));

        await DAssets.bulkWrite(bulkOps);
        
        res.status(200).json({ message: 'DAssets synchronized successfully', count: d365DAssets.length });
    } catch (error) {
        console.error('Error synchronizing assets from Dynamics 365:', error);
        res.status(500).json({ message: 'Synchronization failed', error: error.message });
    }
 }*/
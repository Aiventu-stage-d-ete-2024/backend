import Assets from '../model/assetsModel.js';

export async function getAllAssets (req, res) {
    try {
        const assets = await Assets.find();
        res.status(200).json({ assets });
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function createAsset(req, res) {
    try {
        const newAsset = await Assets.create(req.body);
        res.status(201).json(newAsset);
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function getAssetByAssetID(req, res) {
    try {
        const { AssetID } = req.params;
        const asset = await Assets.findOne({ AssetID: AssetID });

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
        const updatedAsset = await Assets.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAsset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.status(200).json(updatedAsset);
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function deleteAsset(req, res) {
    try {
        const { id } = req.params;
        const deletedAsset = await Assets.findByIdAndDelete(id);
        
        if (!deletedAsset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function searchAssets(req, res) {
   try {
        const { query } = req.query;
        const regex = new RegExp(query, 'i');
        let searchConditions = [];
        searchConditions.push({ AssetID: regex },{ Name: regex },{ Parent: regex },
                { AssetType: regex },{ Manufacturer: regex },{ Model: regex },
                { CustomerAccount: regex },{ FunctionalLocation: regex },
                { CurrentLifecycleState: regex });
                const assets = query 
                    ? await Assets.find({ $or: searchConditions }) 
                    : await Assets.find({});
        
                res.status(200).json(assets);
            } catch (error) {
                console.error('Error searching assets:', error);
                res.status(500).json({ message: 'Server error' });
            }
        }
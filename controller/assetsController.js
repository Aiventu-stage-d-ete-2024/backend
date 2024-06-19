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
        const newAsset = await Assets.create(req.body); // Assuming req.body contains the asset data
        res.status(201).json(newAsset);
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function getAssetById(req, res) {
    try {
        const { id } = req.params;
        const asset = await Assets.findById(id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        console.error('Error fetching asset by ID:', error);
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



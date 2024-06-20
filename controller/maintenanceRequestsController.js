import MaintenanceRequests from '../model/maintenanceRequestsModel.js';

export async function getAllMaintenanceRequests (req, res) {
    try {
        const maintenanceRequests = await MaintenanceRequests.find();
        res.status(200).json({ maintenanceRequests });
    } catch (error) {
        console.error('Error fetching maintenanceRequests:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function createMaintenanceRequest(req, res) {
    try {
        const newMaintenanceRequest = await MaintenanceRequests.create(req.body);
        res.status(201).json(newMaintenanceRequest);
    } catch (error) {
        console.error('Error creating maintenanceRequest:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function getMaintenanceRequestById(req, res) {
    try {
        const { id } = req.params;
        const maintenanceRequest = await MaintenanceRequests.findById(id);
        if (!maintenanceRequest) {
            return res.status(404).json({ message: 'MaintenanceRequest not found' });
        }
        res.status(200).json(maintenanceRequest);
    } catch (error) {
        console.error('Error fetching maintenanceRequest by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function updateMaintenanceRequest(req, res) {
    try {
        const { id } = req.params;
        const updatedMaintenanceRequest = await MaintenanceRequests.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMaintenanceRequest) {
            return res.status(404).json({ message: 'MaintenanceRequest not found' });
        }
        res.status(200).json(updatedMaintenanceRequest);
    } catch (error) {
        console.error('Error updating maintenanceRequest:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



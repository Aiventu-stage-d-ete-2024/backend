import MaintenanceRequests from '../model/maintenanceRequestsModel.js';
import Assets from '../model/assetsModel.js';
import moment from 'moment';

export async function getAllMaintenanceRequests(req, res) {
    try {
        const maintenanceRequests = await MaintenanceRequests.find();
        const formattedRequests = maintenanceRequests.map(request => {
            const formattedRequest = {
                ...request.toObject(),
                AssetID: request.Asset,
                Asset: undefined 
            };
            formattedRequest.ActualStart = formattedRequest.ActualStart ? moment(formattedRequest.ActualStart).format('M/D/YYYY h:mm:ss A') : null;
            return formattedRequest;
        });
        res.status(200).json({ maintenanceRequests: formattedRequests });
    } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

/* export async function getAllMaintenanceRequests(req, res) {
    try {
        const maintenanceRequests = await MaintenanceRequests.find();
        const formattedRequests = maintenanceRequests.map(request => {
            const formattedRequest = {
                ...request.toObject(),
            AssetName: request.Asset,
            Asset: undefined
        };
            formattedRequest.ActualStart = formattedRequest.ActualStart ? moment(formattedRequest.ActualStart).format('M/D/YYYY h:mm:ss A') : null;
            return formattedRequest;
        });
        res.status(200).json({ maintenanceRequests: formattedRequests });
    } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
}*/

export async function createMaintenanceRequest(req, res) {
    const {
        RequestID, RequestType, Description, ServiceLevel,
        FunctionalLocation, AssetName, AssetID, 
        AssetVerified, JobType, JobVariant, JobTrade,
        ActualStart, StartedByWorker, ResponsibleWorkerGroup,
        ResponsibleWorker, CurrentLifecycleState, NumberOfFaults,
    } = req.body;

    try {
        let asset;
        if (AssetID) {
            asset = await Assets.findOne({ AssetID });
        } else if (AssetName) {
            asset = await Assets.findOne({ Name: AssetName });
        } else {
            return res.status(400).json({ message: 'AssetID or AssetName is required' });
        }
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        const newMaintenanceRequest = new MaintenanceRequests({
            RequestID, RequestType, Description, ServiceLevel,
            FunctionalLocation, Asset: asset.AssetID, AssetVerified,
            JobType, JobVariant, JobTrade, ActualStart,
            StartedByWorker, ResponsibleWorkerGroup, ResponsibleWorker,
            CurrentLifecycleState, NumberOfFaults,});

        await newMaintenanceRequest.save();
        res.status(201).json({ maintenanceRequest: newMaintenanceRequest });
    } catch (error) {
        console.error('Error creating maintenance request:', error);
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


/*export async function getMaintenanceRequestById(req, res) {
    try {
        const { id } = req.params;
        const maintenanceRequest = await MaintenanceRequests.findById(id);
        if (!maintenanceRequest) {
            return res.status(404).json({ message: 'MaintenanceRequest not found' });
        }
        const formattedRequest = {
            ...maintenanceRequest.toObject(),
            AssetName: maintenanceRequest.Asset,
            Asset: undefined 
        };
        formattedRequest.ActualStart = formattedRequest.ActualStart ? moment(formattedRequest.ActualStart).format('M/D/YYYY h:mm:ss A') : null;
        res.status(200).json(formattedRequest);
    } catch (error) {
        console.error('Error fetching maintenanceRequest by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}*/

export async function getMaintenanceRequestById(req, res) {
    try {
        const { id } = req.params;
        const maintenanceRequest = await MaintenanceRequests.findById(id);
        if (!maintenanceRequest) {
            return res.status(404).json({ message: 'MaintenanceRequest not found' });
        }
        const formattedRequest = {
            ...maintenanceRequest.toObject(),
            AssetID: maintenanceRequest.Asset,
            Asset: undefined
        };
        formattedRequest.ActualStart = formattedRequest.ActualStart ? moment(formattedRequest.ActualStart).format('M/D/YYYY h:mm:ss A') : null;
        res.status(200).json(formattedRequest);
    } catch (error) {
        console.error('Error fetching maintenanceRequest by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
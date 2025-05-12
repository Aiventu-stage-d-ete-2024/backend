import MaintenanceRequests from '../model/maintenanceRequestsModel.js';
import Assets from '../model/assetsModel.js';
import moment from 'moment';
import {createNotification as createNotificationUtil} from '../middleware/createNotification.js';

export async function getAllMaintenanceRequests(req, res) {
    try {
        const maintenanceRequests = await MaintenanceRequests.find();
        const formattedRequests = maintenanceRequests.map(maintenanceRequest => {
            const formattedRequest = {
                ...maintenanceRequest.toObject(),
                Asset: maintenanceRequest.Asset,
                AssetID: undefined 
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




export async function createMaintenanceRequest(req, res) {
    const {
        RequestID, RequestType, Description, ServiceLevel,
        FunctionalLocation, 
        //AssetName, 
        AssetID, 
        AssetVerified, JobType, JobVariant, JobTrade,
        ActualStart, StartedByWorker, ResponsibleWorkerGroup,
        ResponsibleWorker, WorkOrder, CurrentLifecycleState, NumberOfFaults,
    } = req.body;

    try {
        /* let asset;
        if (AssetID) {
            asset = await Assets.findOne({ AssetID });
        } else if (AssetName) {
            asset = await Assets.findOne({ Name: AssetName });
        } else {
            return res.status(400).json({ message: 'AssetID or AssetName is required' });
        }
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        } */

        const newMaintenanceRequest = new MaintenanceRequests({
            RequestID, RequestType, Description, ServiceLevel,
            FunctionalLocation, 
            //Asset: asset.
            AssetID, AssetVerified,
            JobType, JobVariant, JobTrade, ActualStart,
            StartedByWorker, ResponsibleWorkerGroup, ResponsibleWorker,
            WorkOrder, CurrentLifecycleState, NumberOfFaults,});
            console.log('Creating maintenance request with data:', req.body);
        await newMaintenanceRequest.save();
        await createNotificationUtil(`New maintenance request created: ${newMaintenanceRequest.RequestID}`);
        res.status(201).json({ maintenanceRequest: newMaintenanceRequest });
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function updateMaintenanceRequest(req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedRequest = await MaintenanceRequests.findByIdAndUpdate(id, updatedData, { new: true });
        console.log('Updating maintenance request with data:', req.body);
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }
        await createNotificationUtil(`Maintenance request updated: ${updatedRequest.RequestID}`);
        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error('Error updating maintenance request:', error);
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

export async function getMaintenanceRequestByRequestID(req, res) {
    try {
        const { RequestID } = req.params;
        const maintenanceRequest = await MaintenanceRequests.findOne({ RequestID: RequestID });

        if (!maintenanceRequest) {
            return res.status(404).json({ message: 'maintenanceRequest not found' });
        }
        const formattedRequest = {
                ...maintenanceRequest.toObject(),
                Asset: maintenanceRequest.Asset,
                AssetID: undefined 
            };
        formattedRequest.ActualStart = formattedRequest.ActualStart ? moment(formattedRequest.ActualStart).format('M/D/YYYY h:mm:ss A') : null;
        res.status(200).json(formattedRequest);
    } catch (error) {
        console.error('Error fetching maintenanceRequest by RequestID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function deleteRequest(req, res) {
    try {
        const { id } = req.params;
        const deletedmaintenanceRequest = await MaintenanceRequests.findByIdAndDelete(id);
        if (!deletedmaintenanceRequest) {
            return res.status(404).json({ message: 'request not found' });
        }
        await createNotificationUtil(`Maintenance request deleted: ${deletedmaintenanceRequest.RequestID}`);
        res.status(200).json({ message: 'request deleted successfully' });
    } catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function getMaintenanceRequestsByDate(req, res) {
    try {
        const { date } = req.params;
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);

        const requests = await MaintenanceRequests.find({
            ActualStart: {
                $gte: start,
                $lt: end
            }
        });

        res.status(200).json({ maintenanceRequests: requests });
    } catch (error) {
        console.error('Error fetching maintenance requests by date:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function searchMaintenanceRequests(req, res) {
    try {
        const { query } = req.query;

        if (!query || query.trim() === '') {
            const allRequests = await MaintenanceRequests.find();
            return res.status(200).json(allRequests);
        }

        const regex = new RegExp(query, 'i');
        const requests = await MaintenanceRequests.find({
            $or: [
                { RequestID: regex },
                { RequestType: regex },
                { Description: regex },
                { FunctionalLocation: regex },
                { AssetName: regex },
                { AssetID: regex },
                { JobType: regex },
                { JobVariant: regex },
                { JobTrade: regex },
                { StartedByWorker: regex },
                { ResponsibleWorkerGroup: regex },
                { ResponsibleWorker: regex },
                { WorkOrder: regex },
                { CurrentLifecycleState: regex }
            ]
        });

        res.status(200).json(requests);
    } catch (error) {
        console.error('Error searching maintenance requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
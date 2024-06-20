import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const maintenanceRequestsSchema = new Schema({
    RequestID: String,
    RequestType: String,
    Description: String,
    ServiceLevel: Number,
    FunctionalLocation: String,
    Asset: { type: Schema.Types.ObjectId, ref: 'Assets' },
    AssetVerified: Boolean,
    JobType: String,
    JobVariant: String,
    JobTrade: String,
    ActualStart: Date,
    StartedByWorker: String,
    ResponsibleWorkerGroup: String,
    ResponsibleWorker: String,
    CurrentLifecycleState: String,
    NumberOfFaults: Number,
});

export default model('MaintenanceRequests', maintenanceRequestsSchema);
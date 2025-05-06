/* import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const assetsSchema = new Schema({
    AssetID: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Parent: String,
    NumberOfChildren: Number,
    AssetType: String,
    Manufacturer: String,
    Model: String,
    CustomerAccount: String,
    Criticality: Number,
    FunctionalLocation: String,
    CurrentLifecycleState: String,
    // Add timestamp fields
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // Add sync status fields
    lastSyncedWithD365: Date,
    syncStatus: { type: String, enum: ['synced', 'pending', 'failed'], default: 'pending' },
    syncError: String
});

// Middleware to update updatedAt before saving
assetsSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});


export default model('DAssets', assetsSchema); */
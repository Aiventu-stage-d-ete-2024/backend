import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const assetsSchema = new Schema({
    AssetID: String,
    Name: String,
    Parent: String,
    NumberOfChildren: Number,
    AssetType: String,
    Manufacturer: String,
    Model: String,
    CustomerAccount: String,
    Criticality: Number,
    FunctionalLocation: String,
    CurrentLifecycleState: String,
    lastModified: { type: Date, default: Date.now, index: true },
    version: { type: Number, default: 1 }
}, {
    timestamps: true
});

assetsSchema.pre('save', function(next) {
    this.lastModified = Date.now();
    this.version += 1;
    next();
});

export default model('Assets', assetsSchema);
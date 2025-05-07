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
    LastModified: { type: Date, default: Date.now, index: true },
    Version: { type: Number, default: 1 }
}, {
    timestamps: true
});

assetsSchema.pre('save', function(next) {
    this.LastModified = Date.now();
    this.Version += 1;
    next();
});

export default model('Assets', assetsSchema);
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
});

export default model('Assets', assetsSchema);
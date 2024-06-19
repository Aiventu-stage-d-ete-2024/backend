import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const assetsSchema = new Schema({
    ObjectID: String,
    Name: String,
    Parent: String,
    Children: String,
    AssetType: String,
    Manufacturer: String,
    Model: String,
    CustomerAccount: String,
    Criticality: String,
    FunctionalLocation: String,
    CurrentLifecycleState: String,
});

export default model('Assets', assetsSchema);
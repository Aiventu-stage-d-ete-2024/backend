import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const countersSchema = new Schema({
    CounterID:String,
    Asset: { type: String,ref:'Assets'},
    FunctionalLocation:{ type: String,ref:'Assets'},
    Counter: String,
    CounterReset: String,
    Registered: Date,
    Value: Number,
    Unit: String,
    AggregatedValue: Number,
    Totals: Number,
});

export default model('Counters', countersSchema);
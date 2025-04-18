import mongoose from 'mongoose';
const { Schema,model } = mongoose;

const notificationSchema = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notifications', notificationSchema);

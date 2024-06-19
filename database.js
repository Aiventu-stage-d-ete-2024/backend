import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log('Connected to Database');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectToDatabase;
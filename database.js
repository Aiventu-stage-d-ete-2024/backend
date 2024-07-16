import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  try {
    const mongoURI = "mongodb+srv://marsaoui81:BUSkF65YjmrQ11Dd@cluster0.kppa4tg.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(mongoURI);
    console.log('Connected to Database');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectToDatabase;
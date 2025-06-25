// configs/db.js
import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/JobPortal`);

    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB:", db.connection.name);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;

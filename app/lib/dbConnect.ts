import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  try {

    if(!MONGODB_URI) {
      console.error("MongoDB URI is missing in mongodb");
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: "nextjs-backend",
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
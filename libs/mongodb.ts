import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    // Check if the MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }
    
    // The '!' tells TypeScript that the variable will not be undefined at this point
    await mongoose.connect(process.env.MONGODB_URI!); 
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Exit the application if the connection fails
    process.exit(1); 
  }
};

export default connectMongoDB;
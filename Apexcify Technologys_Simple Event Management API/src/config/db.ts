import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("DB URI is Missing");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MOngoDB Connection Failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
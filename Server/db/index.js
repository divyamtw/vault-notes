import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!!");
  } catch (error) {
    console.log("Database Connection Failed!", error.message);
  }
};

export default connectDB;

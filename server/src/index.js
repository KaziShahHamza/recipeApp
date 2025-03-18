import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB..");
    const conn = await mongoose.connect(
      "mongodb+srv://kazishahhamza:u9i5RzWFxlIbYxCf@cluster0.2rnwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.listen(3001, () => console.log("Server running on port 3001"));

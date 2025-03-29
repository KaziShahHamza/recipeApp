import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/UserRouter.js";
import { recipeRouter } from "./routes/RecipeRouter.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

const connectDB = async () => {
  try {
    console.log("Connecting to Database...");
    const conn = await mongoose.connect(
      "mongodb+srv://kazishahhamza:u9i5RzWFxlIbYxCf@cluster0.2rnwq.mongodb.net/recipedb?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Atlas Connected`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.listen(3001, () => console.log("Server running on port 3001"));

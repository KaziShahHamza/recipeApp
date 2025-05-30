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
    // console.log("Mongo URI: ", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas Connected`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.listen(3001, () => console.log("Server running on port 3001"));

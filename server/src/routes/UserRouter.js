import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (user) {
    res.json({message: "user already exists"});
  } 

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({username, password: hashedPassword});
  await newUser.save();

  res.json({message: "user registered successfully"});
});

export { router as userRouter };

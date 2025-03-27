import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/env", (req, res) => {
  console.log("secretKey :", process.env.JWT_SECRET);
  console.log("secret + " + process.env.JWT_SECRET);
  
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET not found in env" });
  }

  res.json({
    JWT_SECRET: process.env.JWT_SECRET,
  });
});


router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "user registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "user not found" });
  }
  console.log("user found");
  console.log(user);

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.json({ message: "password doesn't match" });
  }
  console.log("password matched");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  if (token) {
    console.log("token generated");
    console.log(token);
  }
  res.json({ token, userID: user._id });
});

export { router as userRouter };

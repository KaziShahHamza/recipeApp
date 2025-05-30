import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";

const router = express.Router();

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
    console.log("user not found");
    return res.json({ message: "user not found" });
  }
  console.log("user found");

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    console.log("password don't match");
    return res.json({ message: "password doesn't match" });
  }
  console.log("password matched");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  if (token) {
    console.log("token generated");
  }
  res.json({ token, userID: user._id });
});


export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { router as userRouter };
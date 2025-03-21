import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, pass } = req.body;

  const person = await UserModel.findOne({ username: username});
  if (person) {
    res.json(person);
  } else {
    res.json("No user found");
  }
});

export { router as userRouter };

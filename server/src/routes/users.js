import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { user, pass } = req.body;

  const testUser = new UserModel({ username: user, password: pass });
  await testUser.save();
  res.json("Test user added!");

  //   const person = await UserModel.findOne({ username: user });
  //   if (person) {
  //     res.json("user found");
  //     res.json(person);
  //   } else {
  //     res.json("No user found");
  //   }
});

export { router as userRouter };

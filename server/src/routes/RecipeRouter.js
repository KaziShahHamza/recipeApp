import RecipeModel from "../models/RecipeModel.js";
import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
    console.log("Recipes fetched");
  } catch (error) {
    console.log("Recipes not fetched");
    res.json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();

    res.json("Recipe Created");
    console.log("Recipe Created 2");
  } catch (error) {
    console.log("Recipe not created");
    res.json({ message: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();
    console.log("savedUser: ", savedUser);
    console.log("Recipe saved");
    const savedRecipes = user.savedRecipes;
    console.log("savedRecipes: ", savedRecipes);
    res.json(savedRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipes = await RecipeModel.find({
      _id: {
        $in: user.savedRecipes,
      },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as recipeRouter };

import RecipeModel from "../models/RecipeModel.js";
import UserModel from "../models/UserModel.js";
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
    await recipe.save();

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
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const user = await UserModel.findById(req.body.userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    user.savedRecipes.push(recipe._id);
    await user.save();

    const savedRecipes = user.savedRecipes;
    console.log("savedRecipes: ", savedRecipes);
    res.json(savedRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error from recipeRouter");
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
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

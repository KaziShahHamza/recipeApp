import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipe, setSavedRecipe] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recipes/savedRecipes/${userID}`
        );
        setSavedRecipe(response.data.savedRecipes);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      <ul>
        {savedRecipe.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SavedRecipes;

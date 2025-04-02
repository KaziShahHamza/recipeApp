import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipe(response.data.savedRecipes);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();

    if(cookies.access_token) fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes/", {
        recipeID,
        userID,
      },
    {
      headers: {authorization: cookies.access_token}
    });
      setSavedRecipe(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log("Error from homepage");
    }
  };

  const isRecipeSaved = (id) => savedRecipe.includes(id);

  return (
    <>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "save"}
              </button>
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

export default Home;

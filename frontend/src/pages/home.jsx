import React, { useEffect, useState } from "react";
import RecipeCard from "@/components/recipecard/recipecard";
import axios from "axios";
import "./home.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeDelete = (deletedRecipeID) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.RecipeID.trim() !== deletedRecipeID)
    );
  };

  return (
    <div className="home-container">
      {loading ? (
        <p className="loading">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="no-recipes">No recipes found.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.RecipeID.trim()} recipe={recipe} onDelete={handleRecipeDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

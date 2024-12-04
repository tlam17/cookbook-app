import React, { useEffect, useState } from "react";
import RecipeCard from "@/components/recipecard/recipecard";
import axios from "axios";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data); // Assuming the response matches the structure in the file
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Remove recipe from the list after deletion
  const handleRecipeDelete = (deletedRecipeID) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.RecipeID.trim() !== deletedRecipeID)
    );
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button>Login</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.RecipeID.trim()} recipe={recipe} onDelete={handleRecipeDelete} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

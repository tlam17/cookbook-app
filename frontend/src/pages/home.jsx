import React, { useEffect, useState } from "react";
import RecipeCard from "@/components/recipecard/recipecard";
import axios from "axios";
import LoginForm from './LoginForm';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Toggle login form visibility (should only show when the button is clicked)
  // (we can change this to to a popup if we want)
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  // Handle login success (update login state and hide the login form)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  // Handle logout (update login state)
  const handleLogout = () => {
    setIsLoggedIn(false);
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
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={toggleLoginForm}>Login</button>
        )}
      </div>
      {showLoginForm && <LoginForm onLoginSuccess={handleLoginSuccess} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.RecipeID.trim()} recipe={recipe} onDelete={handleRecipeDelete} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

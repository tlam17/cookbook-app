import React, { useState } from "react";
import LoginForm from "@/pages/LoginForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import "./navbar.css";
import axios from "axios";

const Navbar = ({ onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ingredients, setIngredients] = useState([]);  // Start with an empty ingredients list
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const recipe = {
      RecipeID: formData.get("recipeID"),
      Name: formData.get("name"),
      Directions: formData.get("directions"),
      Cuisine: formData.get("cuisine"),
      Difficulty: formData.get("difficulty"),
      UserID: formData.get("userID"),
      Ingredients: ingredients,
    };

    try {
      await axios.post(`http://localhost:3000/recipes/add`, recipe); // Assuming POST request for adding recipe
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert(`An error occurred while adding the recipe: ${error.message}`);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { Quantity: "", IngredientName: "", Measurement: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Sidebar Toggle */}
        <div className="navbar-menu-icon" onClick={toggleSidebar}>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>

        <div className="navbar-title">
          <h1>Recipe App</h1>
        </div>

        <div className="navbar-buttons">
          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <Button className="navbar-button" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="navbar-button">Login</Button>
              </DialogTrigger>
              <DialogContent className="dialog-content">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          )}

          {/* Add Recipe Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="navbar-button navbar-add">Add Recipe</Button>
            </DialogTrigger>
            <DialogContent className="dialog-content add-recipe">
              <form onSubmit={handleAddRecipe}>
                <h1>Add Recipe</h1>
                <h2>Please enter in your new recipe details.</h2>

                {/* Recipe Inputs */}
                <input type="text" name="recipeID" placeholder="Recipe ID" required />
                <input type="text" name="name" placeholder="Name Of Your Recipe" required />
                <textarea
                  name="directions"
                  placeholder="Recipe Directions"
                  required
                  style={{ backgroundColor: "white", color: "black" }}
                ></textarea>
                <input type="text" name="cuisine" placeholder="Cuisine Type" required />
                <select name="difficulty" required style={{ backgroundColor: "white" }}>
                  <option value="">Select Difficulty</option>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <input type="text" name="userID" placeholder="User ID" required />

                {/* Ingredient Fields */}
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="ingredient-fields"
                    style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}
                  >
                    <input
                      type="text"
                      placeholder="Quantity"
                      value={ingredient.Quantity}
                      onChange={(e) => handleIngredientChange(index, "Quantity", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Ingredient Name"
                      value={ingredient.IngredientName}
                      onChange={(e) => handleIngredientChange(index, "IngredientName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Measurement"
                      value={ingredient.Measurement}
                      onChange={(e) => handleIngredientChange(index, "Measurement", e.target.value)}
                    />
                    <button type="button" onClick={() => handleDeleteIngredient(index)} style={{ marginLeft: "10px", color: "red" }}>
                      Delete
                    </button>
                  </div>
                ))}

                {/* Add Ingredient Button */}
                <button type="button" onClick={handleAddIngredient}>
                  Add Ingredient
                </button>
                <button type="submit">Submit</button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`navbar-sidebar ${isSidebarOpen ? "expanded" : ""}`}>
        {isSidebarOpen && (
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
            X
          </button>
        )}
        <div className="navbar-sidebar-content">
          <p>Sidebar Content</p>
          <p>Additional Links</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

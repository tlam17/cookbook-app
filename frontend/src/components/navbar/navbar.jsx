import React, { useState } from "react";
import LoginForm from "@/pages/LoginForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import "./navbar.css";
import axios from "axios";

const Navbar = ({ onLoginSuccess }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ingredients, setIngredients] = useState([]);  // Start with an empty ingredients list

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
            await axios.handleAddRecipe(`http://localhost:3000/recipes/add/${recipe}`);
            // Cole: code isn't done here, I'm not sure how to handle this get request

            /*
            const response = await fetch("/api/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipe),
            });

            if (!response.ok) {
                // Handle non-OK responses (e.g., 400, 500)
                const errorText = await response.text();
                throw new Error(errorText || "Failed to add recipe");
            }

            // Check if the response body is empty
            if (response.status !== 204) {
                const data = await response.json(); // This will work if the response is valid JSON
                console.log("Recipe added successfully", data);
                alert("Recipe added successfully!");
            } else {
                console.log("Recipe added, but no data returned.");
            }
            */
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

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-title">
                    <h1>Recipe App</h1>
                </div>
                <div className="navbar-buttons">
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="navbar-button navbar-add">Add Recipe</Button>
                        </DialogTrigger>
                        <DialogContent className="dialog-content add-recipe">
                            <form onSubmit={handleAddRecipe}>
                                <h1>Add Recipe</h1>
                                <h2>Please enter in your new recipe details.</h2>
                                <input
                                    type="text"
                                    name="recipeID"
                                    placeholder="Recipe ID"
                                    required
                                />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name Of Your Recipe"
                                    required
                                />
                                <textarea
                                    name="directions"
                                    placeholder="Recipe Directions"
                                    required
                                    style={{ backgroundColor: "white", color: "black" }} // White background and black text for textarea
                                ></textarea>
                                <input
                                    type="text"
                                    name="cuisine"
                                    placeholder="Cuisine Type"
                                    required
                                />
                                <select name="difficulty" required style={{ backgroundColor: "white" }}>
                                    <option value="">Select Difficulty</option>
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="userID"
                                    placeholder="User ID"
                                    required
                                />

                                {/* Ingredient Fields */}
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="ingredient-fields" style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
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
        </nav>
    );
};

export default Navbar;

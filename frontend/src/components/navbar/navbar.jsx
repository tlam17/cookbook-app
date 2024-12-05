import React, { useState } from "react";
import LoginForm from "@/pages/LoginForm";
import SignUpForm from "@/pages/SignUpForm";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import "./navbar.css";
import axios from "axios";

const Navbar = ({ onLoginSuccess, onRecipeAdd }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    RecipeID: "",
    Name: "",
    Directions: "",
    Cuisine: "",
    Difficulty: "",
  });
  const [newIngredient, setNewIngredient] = useState({
    Quantity: "",
    IngredientName: "",
    Measurement: "",
  });

  // Update state when login is successful
  const handleLoginSuccess = (id) => {
    setIsLoggedIn(true);
    setUserId(id); // Set userId received from LoginForm
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (field, value) => {
    setNewIngredient({ ...newIngredient, [field]: value });
  };

  const addIngredient = () => {
    if (newIngredient.Quantity && newIngredient.IngredientName && newIngredient.Measurement) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ Quantity: "", IngredientName: "", Measurement: "" });
    }
  };

  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddRecipe = async () => {
    const recipe = {
      RecipeID: formData.RecipeID,
      Name: formData.Name,
      Directions: formData.Directions,
      Cuisine: formData.Cuisine,
      Difficulty: formData.Difficulty,
      UserID: userId,
      Ingredients: ingredients,
    };

    const missingFields = [];
    if (!recipe.RecipeID) missingFields.push("RecipeID");
    if (!recipe.Name) missingFields.push("Name");
    if (!recipe.Directions) missingFields.push("Directions");
    if (!recipe.Cuisine) missingFields.push("Cuisine");
    if (!recipe.Difficulty) missingFields.push("Difficulty");
    if (!recipe.UserID) missingFields.push("UserID");

    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/recipes/add", recipe);
      if (response.status === 201) {
        alert("Recipe added successfully!");

        // Reset form data and ingredients
        setFormData({
          RecipeID: "",
          Name: "",
          Directions: "",
          Cuisine: "",
          Difficulty: "",
        });
        setIngredients([]);

        // Notify parent to fetch recipes
        onRecipeAdded();
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert(`Failed to add recipe. ${error.response?.data?.error || error.message}`);
    }
  };
  


  const handleSaveUserSettings = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${userId}/update`, {
        name,
        password,
        email,
      });
      if (response.status === 200) {
        alert("User information updated successfully");
        setIsUserSettingsOpen(false);
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${userId}`);
      if (response.status === 200) {
        alert("User account deleted successfully");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">
          <h1>Cookbook App</h1>
        </div>

        <div className="navbar-buttons">
          {!isLoggedIn ? (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="navbar-button">Login</Button>
                </DialogTrigger>
                <DialogContent className="dialog-content">
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="navbar-button">Sign Up</Button>
                </DialogTrigger>
                <DialogContent className="dialog-content">
                  <SignUpForm />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Button className="navbar-button" onClick={handleLogout}>
                Logout
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="navbar-button">User Settings</Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                <DialogTitle>Update Your Account</DialogTitle>
                </DialogHeader>
                  <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <Button onClick={handleSaveUserSettings}>Save</Button>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="navbar-button navbar-delete-account">
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="alert-dialog-content">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Your account and data will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* Add Recipe Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="navbar-button navbar-add">Add Recipe</Button>
                </DialogTrigger>
                <DialogContent className="dialog-content">
                  <DialogHeader>
                    <DialogTitle className="dialog-title">Add Recipe</DialogTitle>
                  </DialogHeader>
                    Enter your recipe details and ingredients below. Click "Save" to add your recipe.
                  <div className="grid gap-4 py-4">
                    {/* Recipe Fields */}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipeID">Recipe ID</Label>
                      <Input
                        id="recipeID"
                        name="RecipeID"
                        value={formData.RecipeID}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="cuisine">Cuisine</Label>
                      <Input
                        id="cuisine"
                        name="Cuisine"
                        value={formData.Cuisine}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Input
                        id="difficulty"
                        name="Difficulty"
                        type="number"
                        value={formData.Difficulty}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="directions">Directions</Label>
                      <Input
                        id="directions"
                        name="Directions"
                        value={formData.Directions}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>

                    {/* Ingredients Section */}
                    <div>
                      <h4 className="text-lg font-semibold">Ingredients</h4>
                      <ScrollArea className="h-50 w-50 rounded-md border">
                        <ul className="ingredients-list">
                          {ingredients.map((ingredient, index) => (
                            <li key={index}>
                              <p>{`${ingredient.Quantity} ${ingredient.Measurement} ${ingredient.IngredientName}`}</p>
                              <Button className="icon-button" onClick={() => handleDeleteIngredient(index)}>
                                <FaTrash />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                      <div className="grid grid-cols-4 items-center gap-4 mt-4">
                        <div className="col-span-3 grid grid-cols-3 gap-4">
                          <Input
                            placeholder="Quantity"
                            name="Quantity"
                            value={newIngredient.Quantity}
                            onChange={(e) => handleIngredientChange("Quantity", e.target.value)}
                          />
                          <Input
                            placeholder="Name"
                            name="IngredientName"
                            value={newIngredient.IngredientName}
                            onChange={(e) => handleIngredientChange("IngredientName", e.target.value)}
                          />
                          <Input
                            placeholder="Measurement"
                            name="Measurement"
                            value={newIngredient.Measurement}
                            onChange={(e) => handleIngredientChange("Measurement", e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button className="icon-button" onClick={addIngredient}>
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddRecipe}>Save Recipe</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

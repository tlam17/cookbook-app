import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaExpandArrowsAlt } from "react-icons/fa";
import axios from "axios";
import "./recipecard.css";

const RecipeCard = ({ recipe, onDelete, onEdit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    Name: recipe.Name.trim(),
    Cuisine: recipe.Cuisine.trim(),
    Difficulty: recipe.Difficulty,
    Directions: recipe.Directions.trim(),
    Ingredients: recipe.Ingredients || [],
  });

const { RecipeID, Name, Difficulty, Cuisine, Directions, Ingredients } = {
  RecipeID: recipe.RecipeID.trim(),
  Name: recipe.Name.trim(),
  Difficulty: recipe.Difficulty,
  Cuisine: recipe.Cuisine.trim(),
  Directions: recipe.Directions.trim(),
  Ingredients: recipe.Ingredients || [],
};

const [newIngredient, setNewIngredient] = useState({
  Quantity: "",
  IngredientName: "",
  Measurement: "",
});

// Handle form input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

// Handle ingredient input changes
const handleIngredientChange = (e) => {
  const { name, value } = e.target;
  setNewIngredient({ ...newIngredient, [name]: value });
};

const handleDelete = async () => {
  try {
      await axios.delete(`http://localhost:3000/recipes/RecipeID/${RecipeID}`);
      if (onDelete) {
          onDelete(RecipeID); // Notify parent component to update UI
      }

      // Show success toast
      toast({
          title: "Recipe Deleted",
          description: `Your recipe has been successfully deleted.`,
      });
  } catch (error) {
      console.error("Failed to delete recipe:", error);

      // Show error toast
      toast({
          title: "Error",
          description: "Failed to delete the recipe. Please try again.",
          variant: "destructive",
      });
  }
};

  // Handle recipe edit submission
  const handleEditSubmit = async () => {
    try {
      const updatedRecipe = { ...formData, RecipeID: recipe.RecipeID };
      await axios.put(`http://localhost:3000/recipes/update/${recipe.RecipeID}`, updatedRecipe);

      if (onEdit) {
        onEdit(updatedRecipe); // Notify parent component to update UI
      }

      toast({
        title: "Recipe Updated",
        description: `${formData.Name} has been successfully updated.`,
      });
    } catch (error) {
      console.error("Failed to update recipe:", error);

      toast({
        title: "Error",
        description: "Failed to update the recipe. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add a new ingredient to the list
  const addIngredient = () => {
    if (newIngredient.Quantity && newIngredient.IngredientName && newIngredient.Measurement) {
      setFormData({
        ...formData,
        Ingredients: [...formData.Ingredients, newIngredient],
      });
      setNewIngredient({ Quantity: "", IngredientName: "", Measurement: "" });
    } else {
      toast({
        title: "Error",
        description: "Please fill out all ingredient fields before adding.",
        variant: "destructive",
      });
    }
  };

  // Remove an ingredient
  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      Ingredients: formData.Ingredients.filter((_, i) => i !== index),
    });
  };

  return (
    <Card className="card">
      <CardHeader className="card-header">
        <CardTitle className="card-title">{formData.Name}</CardTitle>
        <CardDescription className="card-description">
          Difficulty: {formData.Difficulty}
          <br />
          Cuisine: {formData.Cuisine}
        </CardDescription>
      </CardHeader>
      <CardFooter className="card-footer">
        <div className="flex justify-start gap-4 w-full">
           {/* Expand Recipe Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="icon-button">
              <FaExpandArrowsAlt />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="alert-dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="alert-dialog-title">{formData.Name}</AlertDialogTitle>
              <AlertDialogDescription className="alert-dialog-description">
                <p><strong>Cuisine:</strong> {formData.Cuisine}</p>
                <p><strong>Difficulty:</strong> {formData.Difficulty}</p>
                <p><strong>Instructions:</strong></p>
                <p>{formData.Directions}</p>
                <p><strong>Ingredients:</strong></p>
                <ScrollArea className="h-20 w-50 rounded-md border">
                  <ul>
                    {formData.Ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.Quantity} {ingredient.Measurement} {ingredient.IngredientName}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="alert-cancel">Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Recipe Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="icon-button">
              <FaPencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="dialog-content">
            <DialogHeader>
              <DialogTitle className="dialog-title">Edit Recipe</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Make changes to your recipe and ingredients here. Click save when you're done.
            </DialogDescription>
            <div className="grid gap-4 py-4">
              {/* Recipe Fields */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cuisine">
                  Cuisine
                </Label>
                <Input
                  id="cuisine"
                  name="Cuisine"
                  value={formData.Cuisine}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="difficulty">
                  Difficulty
                </Label>
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
                <Label htmlFor="directions">
                  Directions
                </Label>
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
                    {formData.Ingredients.map((ingredient, index) => (
                      <li key={index}>
                        <p>{`${ingredient.Quantity} ${ingredient.Measurement} ${ingredient.IngredientName}`}</p>
                        <Button className="icon-button" onClick={() => removeIngredient(index)}>
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
                      onChange={handleIngredientChange}
                    />
                    <Input
                      placeholder="Name"
                      name="IngredientName"
                      value={newIngredient.IngredientName}
                      onChange={handleIngredientChange}
                    />
                    <Input
                      placeholder="Measurement"
                      name="Measurement"
                      value={newIngredient.Measurement}
                      onChange={handleIngredientChange}
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
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Recipe Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="icon-button">
              <FaTrash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="alert-dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="alert-dialog-title">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="alert-dialog-description">
                This action cannot be undone. This will permanently delete your
                recipe and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="alert-cancel">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;

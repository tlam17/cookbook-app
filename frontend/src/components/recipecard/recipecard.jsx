import React from "react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaExpandArrowsAlt } from "react-icons/fa";
import axios from "axios";
import "./recipecard.css";

const RecipeCard = ({ recipe, onDelete }) => {
  const { toast } = useToast();

  const { RecipeID, Name, Difficulty, Cuisine, Directions, Ingredients } = {
    RecipeID: recipe.RecipeID.trim(),
    Name: recipe.Name.trim(),
    Difficulty: recipe.Difficulty,
    Cuisine: recipe.Cuisine.trim(),
    Directions: recipe.Directions.trim(),
    Ingredients: recipe.Ingredients || [],
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
        description: `$Your recipe has been successfully deleted.`,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      const updatedRecipe = { ...formData, RecipeID: recipe.RecipeID };
      await axios.put(`http://localhost:3000/recipes/update/${recipe.RecipeID}`, updatedRecipe);

      if (onEdit) {
        onEdit(updatedRecipe); // Notify parent component to update UI
      }

      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Failed to update recipe:", error);
      alert("Error updating the recipe. Please try again.");
    }
  };

  // Card structure
  return (
    <Card className="card">
      <CardHeader className="card-header">
        <CardTitle className="card-title">{Name}</CardTitle>
        <CardDescription className="card-description">
          Difficulty: {Difficulty}
          <br />
          Cuisine: {Cuisine}
        </CardDescription>
      </CardHeader>
      <CardFooter className="card-footer">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <FaExpandArrowsAlt />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="alert-dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="alert-dialog-title">{Name}</AlertDialogTitle>
              <AlertDialogDescription className="alert-dialog-description">
                <p><strong>Cuisine:</strong> {Cuisine}</p>
                <p><strong>Difficulty:</strong> {Difficulty}</p>
                <p><strong>Instructions:</strong></p>
                <p>{Directions}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                  {Ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.Quantity} {ingredient.Measurement.trim()}{" "}
                      {ingredient.IngredientName.trim()}
                    </li>
                  ))}
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FaPencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Recipe</DialogTitle>
              <DialogDescription>
                Make changes to your recipe here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
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
                <Label htmlFor="cuisine" className="text-right">
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
                <Label htmlFor="difficulty" className="text-right">
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
                <Label htmlFor="directions" className="text-right">
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
            </div>
          </DialogContent>
        </Dialog>
                
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
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
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;

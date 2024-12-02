import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
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
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaExpandArrowsAlt } from "react-icons/fa";
import axios from "axios";

const RecipeCard = ({ recipe, onDelete }) => {
  const { RecipeID, Name, Difficulty, Cuisine } = {
    RecipeID: recipe.RecipeID.trim(),
    Name: recipe.Name.trim(),
    Difficulty: recipe.Difficulty,
    Cuisine: recipe.Cuisine.trim(),
  };

// Handle delete recipe
const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:3000/recipes/RecipeID/${RecipeID}`);
    if (onDelete) {
      onDelete(RecipeID); // Notify parent component to update UI
    }
  } catch (error) {
    console.error("Failed to delete recipe:", error);
    alert("Error deleting the recipe. Please try again.");
  }
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>{Name}</CardTitle>
        <CardDescription>
          Difficulty: {Difficulty}
          <br></br>
          Cuisine: {Cuisine}
        </CardDescription>
      </CardHeader>
      <CardFooter>
          <Button><FaExpandArrowsAlt></FaExpandArrowsAlt></Button>
          <Button><FaPencil></FaPencil></Button>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button><FaTrash></FaTrash></Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
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

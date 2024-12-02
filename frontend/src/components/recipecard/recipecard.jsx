import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

const RecipeCard = ({ recipe }) => {
  const { Name, Difficulty, Cuisine } = {
    Name: recipe.Name.trim(),
    Difficulty: recipe.Difficulty,
    Cuisine: recipe.Cuisine.trim(),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{Name}</CardTitle>
        <CardDescription>
          Difficulty: {Difficulty} | Cuisine: {Cuisine}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default RecipeCard;

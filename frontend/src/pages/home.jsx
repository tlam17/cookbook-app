import React, { useEffect, useState } from "react";
import RecipeCard from "@/components/recipecard/recipecard";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import "./home.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("name"); // Default filter type
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Fetch all recipes initially
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleFilter = async () => {
    if (!filterValue) {
      // Reset to display all recipes when the filter value is empty
      const response = await axios.get("http://localhost:3000/recipes");
      setRecipes(response.data);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/recipes/${filterType}/${filterValue}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error(`Error fetching recipes by ${filterType}:`, error);
    }
  };

  const handleRecipeDelete = (deletedRecipeID) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.RecipeID.trim() !== deletedRecipeID)
    );
  };

  return (
    <div className="home-container">
      {/* Filter UI */}
      <div className="filter-container">
        <Select onValueChange={(value) => setFilterType(value)}>
          <SelectTrigger className="filter-select">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="cuisine">Cuisine</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="filter-input"
          placeholder={`Search by ${filterType}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <Button className="filter-button" onClick={handleFilter}>
          <FaSearch></FaSearch>
        </Button>
      </div>

      {/* Recipe List */}
      {loading ? (
        <p className="loading">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="no-recipes">No recipes found.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.RecipeID.trim()}
              recipe={recipe}
              onDelete={handleRecipeDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

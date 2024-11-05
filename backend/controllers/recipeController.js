const pool = require('../db/pool');

// Helper function to format recipes with their ingredients
const formatRecipesWithIngredients = (rows) => {
  return rows.reduce((acc, row) => {
      const { recipeid, recipename, directions, cuisine, difficulty, quantity, ingredientname, measurement } = row;

      // If the recipe hasn't been added to the accumulator, add it
      if (!acc[recipeid]) {
          acc[recipeid] = {
              RecipeID: recipeid,
              Name: recipename,
              Directions: directions,
              Cuisine: cuisine,
              Difficulty: difficulty,
              Ingredients: []
          };
      }

      // Add each ingredient to the corresponding recipe's ingredients list
      if (ingredientname) {  // Check for null ingredient names
          acc[recipeid].Ingredients.push({
              Quantity: quantity,
              IngredientName: ingredientname,
              Measurement: measurement
          });
      }

      return acc;
  }, {});
};

// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
      const query = `
        SELECT 
            r.RecipeID,
            r.Name AS RecipeName,
            r.Directions,
            r.Cuisine,
            r.Difficulty,
            i.Quantity,
            i.IngredientName,
            i.Measurement
        FROM 
            Recipes r
        LEFT JOIN 
            Ingredients i ON r.RecipeID = i.RecipeID
        ORDER BY 
            r.RecipeID, i.IngredientName;`;

      const result = await pool.query(query);
      const recipes = formatRecipesWithIngredients(result.rows);
      res.json(Object.values(recipes));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Get recipe by ID
const getRecipeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        r.RecipeID,
        r.Name AS RecipeName,
        r.Directions,
        r.Cuisine,
        r.Difficulty,
        i.Quantity,
        i.IngredientName,
        i.Measurement
      FROM 
        Recipes r
      LEFT JOIN
        Ingredients i ON r.RecipeID = i.RecipeID
      WHERE
        r.RecipeID = $1`;
      const result = await pool.query(query, [id]);
      const recipes = formatRecipesWithIngredients(result.rows);
      res.json(Object.values(recipes));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recipe by name
const getRecipeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const query = `
      SELECT 
        r.RecipeID,
        r.Name AS RecipeName,
        r.Directions,
        r.Cuisine,
        r.Difficulty,
        i.Quantity,
        i.IngredientName,
        i.Measurement
      FROM 
        Recipes r
      LEFT JOIN
        Ingredients i ON r.RecipeID = i.RecipeID
      WHERE
        LOWER(r.Name) = LOWER($1)`;
      const result = await pool.query(query, [name]);
      const recipes = formatRecipesWithIngredients(result.rows);
      res.json(Object.values(recipes));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recipe by author
const getRecipeByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const query = `
      SELECT 
        r.RecipeID,
        r.Name AS RecipeName,
        r.Directions,
        r.Cuisine,
        r.Difficulty,
        i.Quantity,
        i.IngredientName,
        i.Measurement
      FROM 
        Recipes r
      JOIN
        Makes_A ON r.RecipeID = Makes_A.RecipeID
      LEFT JOIN
        Ingredients i ON r.RecipeID = i.RecipeID
      WHERE
        Makes_A.UserID = $1`;
    const result = await pool.query(query, [author]);
    const recipes = formatRecipesWithIngredients(result.rows);
    res.json(Object.values(recipes));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recipe by cuisine
const getRecipeByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params;
    const query = `
      SELECT 
        r.RecipeID,
        r.Name AS RecipeName,
        r.Directions,
        r.Cuisine,
        r.Difficulty,
        i.Quantity,
        i.IngredientName,
        i.Measurement
      FROM 
        Recipes r
      LEFT JOIN
        Ingredients i ON r.RecipeID = i.RecipeID
      WHERE
        LOWER(r.Cuisine) = LOWER($1)`;
    const result = await pool.query(query, [cuisine]);
    const recipes = formatRecipesWithIngredients(result.rows);
    res.json(Object.values(recipes));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recipe by difficulty
const getRecipeByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    const query = `
      SELECT 
        r.RecipeID,
        r.Name AS RecipeName,
        r.Directions,
        r.Cuisine,
        r.Difficulty,
        i.Quantity,
        i.IngredientName,
        i.Measurement
      FROM 
        Recipes r
      LEFT JOIN
        Ingredients i ON r.RecipeID = i.RecipeID
      WHERE
        r.Difficulty = $1`;
    const result = await pool.query(query, [difficulty]);
    const recipes = formatRecipesWithIngredients(result.rows);
    res.json(Object.values(recipes));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeByID,
  getRecipeByName,
  getRecipeByAuthor,
  getRecipeByCuisine,
  getRecipeByDifficulty
}
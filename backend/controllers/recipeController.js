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

const addRecipe = async (req, res) => {
  try {
    // Extract recipe data from the request body
    const { RecipeID, Name, Directions, Cuisine, Difficulty, UserID, Ingredients } = req.body;

    // Check if required fields are provided
    if (!RecipeID || !Name || !Directions || !Cuisine || !Difficulty || !UserID) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Insert the recipe into the Recipes table
    const recipeQuery = `
      INSERT INTO Recipes (RecipeID, Name, Directions, Cuisine, Difficulty)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(recipeQuery, [RecipeID, Name, Directions, Cuisine, Difficulty]);

    // Associate the recipe with the user in the Makes_A table
    const makesAQuery = `
      INSERT INTO Makes_A (UserID, RecipeID)
      VALUES ($1, $2)
    `;
    await pool.query(makesAQuery, [UserID, RecipeID]);

    // Add ingredients to the Ingredients table (if provided)
    if (Ingredients && Array.isArray(Ingredients)) {
      const ingredientQueries = Ingredients.map((ingredient) => {
        const { Quantity, IngredientName, Measurement } = ingredient;
        return pool.query(
          `
          INSERT INTO Ingredients (RecipeID, Quantity, IngredientName, Measurement)
          VALUES ($1, $2, $3, $4)
          `,
          [RecipeID, Quantity, IngredientName, Measurement]
        );
      });
      await Promise.all(ingredientQueries);
    }

    // Send a success response
    res.status(201).json({
      message: 'Recipe added successfully',
      RecipeID: RecipeID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add recipe. ' + error.message });
  }
};

const deleteRecipe = async (req, res) => {
    try {
        const { RecipeID } = req.params;

        if (!RecipeID) {
            return res.status(400).json({ error: "RecipeID is required." });
        }
        const makes_query = 'DELETE FROM Makes_A WHERE RecipeID = $1 RETURNING *;';
        await pool.query(makes_query, [RecipeID]);

        // If ON DELETE CASCADE is not enabled, delete ingredients manually
        await pool.query(`DELETE FROM Ingredients WHERE RecipeID = $1;`, [RecipeID]);

        // Delete the recipe
        const result = await pool.query(`DELETE FROM Recipes WHERE RecipeID = $1 RETURNING *;`, [RecipeID]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Recipe not found." });
        }

        res.status(200).json({
            message: "Recipe and its ingredients deleted successfully.",
            deletedRecipe: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete recipe. " + error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { RecipeID } = req.params;
        const { Name, Directions, Cuisine, Difficulty } = req.body;

        if (!RecipeID) {
            return res.status(400).json({ error: "RecipeID is required." });
        }

        // Build dynamic query
        const fields = [];
        const values = [];
        let query = 'UPDATE Recipes SET ';

        if (Name) {
            fields.push('Name = $' + (fields.length + 1));
            values.push(Name);
        }
        if (Directions) {
            fields.push('Directions = $' + (fields.length + 1));
            values.push(Directions);
        }
        if (Cuisine) {
            fields.push('Cuisine = $' + (fields.length + 1));
            values.push(Cuisine);
        }
        if (Difficulty) {
            fields.push('Difficulty = $' + (fields.length + 1));
            values.push(Difficulty);
        }

        if (fields.length === 0) {
            return res.status(400).json({ error: "No fields provided for update." });
        }

        query += fields.join(', ') + ' WHERE RecipeID = $' + (fields.length + 1) + ' RETURNING *;';
        values.push(RecipeID);

        // Execute the update query
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Recipe not found." });
        }

        res.status(200).json({
            message: "Recipe updated successfully.",
            updatedRecipe: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update recipe. " + error.message });
    }
};

module.exports = {
  getAllRecipes,
  getRecipeByID,
  getRecipeByName,
  getRecipeByAuthor,
  getRecipeByCuisine,
  getRecipeByDifficulty,
  addRecipe,
  deleteRecipe,
  updateRecipe,
}
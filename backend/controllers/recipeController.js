const pool = require('../db/pool');

const getAllRecipes = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Recipes');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    getAllRecipes
  }
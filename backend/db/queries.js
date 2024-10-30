const pool = require("./pool");

async function getAllRecipes() {
    const { rows } = await pool.query("SELECT * FROM Recipes");
    return rows;
}

module.exports = {
    getAllRecipes
};
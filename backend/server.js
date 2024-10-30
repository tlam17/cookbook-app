const express = require("express");
const app = express();
const { getAllRecipes } = require("./db/queries");

app.get("/", (req, res) => res.send("Hello, world!"));

app.get("/recipes", async (req, res) => {
    try {
      const recipes = await getAllRecipes();
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).send("Error fetching recipes");
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
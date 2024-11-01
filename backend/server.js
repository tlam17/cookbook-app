const express = require("express");
const pool = require('./db/pool');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
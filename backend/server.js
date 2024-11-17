const express = require("express");
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
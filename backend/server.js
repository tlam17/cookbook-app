const express = require("express");
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
//app.use('/register', userRoutes);


app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getAllRecipes);
router.get('/id/:id', recipeController.getRecipeByID);
router.get('/name/:name', recipeController.getRecipeByName);
router.get('/author/:author', recipeController.getRecipeByAuthor);
router.get('/cuisine/:cuisine', recipeController.getRecipeByCuisine);
router.get('/difficulty/:difficulty', recipeController.getRecipeByDifficulty);

module.exports = router;
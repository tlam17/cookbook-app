const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.patch('/:userId', userController.updateUser);

// Route to authenticate a user
router.post('/login', userController.authenticateUser);
// Route to delete a user account
router.delete('/:userId', userController.deleteUser);
// Route to retrieve a user's recipes
router.get('/:userId/recipes', userController.getUserRecipes);

module.exports = router;
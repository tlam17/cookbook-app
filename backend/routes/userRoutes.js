const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/add', userController.addUser);
router.delete('/UserID/:UserID', userController.deleteUser);
router.patch('/UserID/:UserID', userController.updateUser);

module.exports = router;
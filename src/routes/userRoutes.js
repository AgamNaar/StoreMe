// Route for all user related actions (signup, login, delete ect...)
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');

const userController = require('../controllers/userController')

// Route to singUp
// parm: email, username, password 
router.post('/users/singUp', userController.signUp);

// Route to login
// parm: email or username and password 
router.post('/users/login', userController.login);

// Route to delete account
// parm: password 
router.delete('/users', authenticateUser, userController.deleteUser);



module.exports = router;

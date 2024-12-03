// Route for all user related actions (signup, login, delete ect...)
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');

const userController = require('../controllers/userController')

// Route to singUp
// parm: email, username, password 
router.post('/signUp', userController.signUp);

// Route to login
// parm: email or username and password 
router.post('/login', userController.login);

// Route to delete account, require valid token 
// parm: password 
router.delete('', authenticateUser, userController.deleteUser);



module.exports = router;

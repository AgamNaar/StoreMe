// Route for all user related actions (signup, login, ...)
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

// Route to singUp 
router.post('/singUp', async (req, res) => {
    try {
        await userController.signUp(req, res);

    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Route to login
router.post('/login', async (req, res) => {
    try {
        await userController.login(req, res);
    } catch (error) {
        console.error('Error login user:', err);
        res.status(500).json({ error: 'Failed to login into user' });
    }
});



module.exports = router;

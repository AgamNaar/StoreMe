const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to validate user and to allow them to access most of the fetuses 
// adds the user to req
const authenticateUser = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        // check if token exist
        if (!token)
            return res.status(401).json({ error: 'Authentication token is missing' });

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the database using the decoded userId
        const user = await User.findById(decoded.userId);

        // Check if user exist 
        if (!user)
            return res.status(401).json({ error: 'User not found' });

        // Attach user data to request for further use
        req.user = user;

        next();
    } catch (error) {
        console.error('Error in authenticateUser middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = authenticateUser;

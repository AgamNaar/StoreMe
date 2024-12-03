const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Controller to handle all of user related actions (login,singUp,delete)
class UserController {

    // Method to handle user sign-up, return token if successfully singed up 
    static async signUp(req, res) {
        try {
            const { userName, email, password } = req.body;

            // Check if the user name or user email are already in use
            const existingUser = await User.findOne({
                $or: [
                    { email: email },
                    { userName: userName }
                ]
            });

            if (existingUser)
                return res.status(409).json({ error: 'User already exists' });

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                userName,
                email,
                password: hashedPassword,
            });

            // save the user in the database
            await newUser.save()

            // Generate a JWT token with user ID
            const token = jwt.sign(
                { userId: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(201).json({ message: 'User registered successfully', token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to handle user login, return return token if successfully logged in
    static async login(req, res) {
        try {
            const { email, userName, password } = req.body;

            // check user info
            if (!password && (!email || !userName))
                return res.status(400).json('invalid info')

            // Find the user either by the email provided or user name 
            let user = email ? await User.findOne({ email: email })
                : await User.findOne({ userName: userName });

            // check if user with that info exist in the DB
            if (!user)
                return res.status(401).json({ error: 'Invalid credentials' });

            // Check if the password match to the password in the DB
            if (!await bcrypt.compare(password, user.password))
                return res.status(401).json({ error: 'Invalid credentials' });

            // Generate a JWT token with user ID
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to handle delete account of a user
    static async deleteUser(req, res) {
        try {
            const { password } = req.body;

            // Check if the user entered a password
            if (!password)
                return res.status(400).json('invalid info')

            // Check if the password match the user info in db 
            if (!await bcrypt.compare(password, req.user.password))
                return res.status(401).json({ error: 'Invalid credentials' });

            // delete the user 
            await req.user.deleteOne()

            return res.status(200).json({ message: 'account deleted!' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}



module.exports = UserController;

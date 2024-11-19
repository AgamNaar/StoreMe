// Controller to handle all of user related actions (login,singUp)

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// user controller class
class UserController {

    // Method to handle user sign-up, return token if successfully singed up 
    static async signUp(req, res) {
        try {
            const { userName, userEmail, userPassword } = req.body;

            // Check if the user name or user password are already in use
            const existingUser = await User.findOne({
                $or: [
                    { userEmail: userEmail },
                    { userName: userName }
                ]
            });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(userPassword, 10);

            // Create a new user
            const newUser = new User({
                userName: userName,
                userEmail: userEmail,
                userPassword: hashedPassword,
            });

            // Save the user in the database
            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully', newUser });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to handle user login, return return token if successfully logged in
    static async login(req, res) {
        try {
            const { userEmail, userName, userPassword } = req.body;

            // check user info
            if (!userPassword && (!userEmail || !userName))
                return res.status(400).json('invalid info')

            // Find the user either by the email provided or user name 
            let user;
            if (!userEmail)
                user = await User.findOne({ userName: userName });
            else
                user = await User.findOne({ userEmail: userEmail });




            // check if user name exists 
            if (!user) {
                return res.status(404).json({ error: 'Invalid credentials' });
            }

            // Check if the password match
            const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = UserController;

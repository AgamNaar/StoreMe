// To lunch and config server 
require('dotenv').config();
const cors = require("cors");
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());


// Connection to DB
require('./src/config/db');

// load routes 
app.use('/users', require('./src/routes/userRoutes'));
app.use('/group', require('./src/routes/groupRoutes'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});


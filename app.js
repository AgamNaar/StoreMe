// To lunch and config server 
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Connection to DB
require('./src/config/db');

// load routes 
app.use('/users', require('./src/routes/userRoutes'));
app.use('/group', require('./src/routes/groupRoutes'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

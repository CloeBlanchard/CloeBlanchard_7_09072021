// variable
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();
const userRoutes = require('./routes/user');


// application
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// body parser
app.use(bodyParser.json());

// route par défaut
app.get('/', function(req, res) {
    return res.send({ message: 'hello world'})
});

// db connect
const dbConnection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    database: process.env.db
});
dbConnection.connect();

// récupération des utilisateurs
app.use('/api/auth', userRoutes);


// set port
app.listen(3000, function() {
    console.log('Node app is running on port 3000');
});
module.exports = app;
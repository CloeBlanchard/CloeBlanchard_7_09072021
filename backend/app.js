// variable
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();


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
app.get('/users', function (req, res) {
    dbConnection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
// récupération des utilisateurs par l'id
app.get('/user/:id', function (req, res)  {
    let user_id = req.params.id;
    if(!user_id) {
        return res.status(400).send({ error: true, message: "Veullez fournir l'id de l'utilisateur"});
    }
    dbConnection.query('SELECT * FROM users WHERE id=?', user_id, function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.'});
    });
});



module.exports = app;
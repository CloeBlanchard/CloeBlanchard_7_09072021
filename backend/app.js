// variable
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();
// import du router des utilisateurs
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

// import des routes d'utilisateurs
app.use('/api/auth', userRoutes);
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
// ajout d'un nouvel utilisateur
app.post('/user', function (req, res) {
    let userinfo = req.body.userinfo
    if(!userinfo) {
        return res.status(400).send({ error: true, message: "Veullez fournir l'utilisateur"});
    }
    dbConnection.query("INSERT INTO users SET ?", userinfo, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: "L'utilisateur à bien été crée" });
    });
});
// mise a jour d'un utilisateur avec l'id
app.put('/user/:id', function (req, res) {
    let user_id = req.params.id;
    let user = req.body.user;
    if (!user_id || !user) {
        return res.status(400).send({ error: true, message: 'Please provide user and user_id' });
    }
    dbConnection.query("UPDATE users SET ? WHERE id_user=?", [user, user_id], function (error, results, field) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
// Suppression d'un utilisateur
app.delete('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConnection.query('DELETE FROM users WHERE id_user=?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ erro: false, data: results, message: "L'utilisateur à bien été supprimé" });
    });
});

module.exports = app;
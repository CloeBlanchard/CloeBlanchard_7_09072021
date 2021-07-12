// import de bcrypt
const bcrypt = require('bcrypt');
// import de jswebtoken
const jwt = require('jsonwebtoken');
// import de mysql
const mysql = require('mysql');
// import du gestionnaire d'environnement
require('dotenv').config();
// import de le connection de mysql
const db_connection = require('../db_connect');
// import de cryptojs
const cryptoJs = require('crypto-js');

// variable de cryptojs
var key = cryptoJs.enc.Hex.parse(process.env.key);
var iv = cryptoJs.enc.Hex.parse(process.env.iv);

// récupération d'un utilisateur unique
exports.getAllUsers = (req, res) => {
    dbConnection.query('SELECT * FROM users', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
};
// import de bcrypt
const bcrypt = require('bcrypt');
// import de jswebtoken
const jwt = require('jsonwebtoken');
// import de mysql
const mysql = require('mysql');
// import du gestionnaire d'environnement
require('dotenv').config();
// import de le connection de mysql
const dbConnection = require('../db_connect');
// import de cryptojs
const cryptoJs = require('crypto-js');

// variable de cryptojs
var key = cryptoJs.enc.Hex.parse(process.env.key);
var iv = cryptoJs.enc.Hex.parse(process.env.iv);

// récupération de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    dbConnection.query('SELECT * FROM users', (err, result) => {
        if (err) throw err;
        return res.send({ error: false, message: result});
    });
};

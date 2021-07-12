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

// récupération d'un utilisateur avec l'id
exports.getUser = (req, res) => {
    let user_id = req.params.id;
    if(!user_id) {
        return res.status(400).send({ error: true, message: "Veullez fournir l'id de l'utilisateur"});
    }
    dbConnection.query('SELECT * FROM users WHERE id_user=?', user_id, function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: results[0] });
    });
}
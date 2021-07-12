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
exports.getAllUsers = (req, res, next) => {
    dbConnection.query('SELECT * FROM users', (err, result) => {
        if (err) throw err;
        return res.send({ error: false, message: result });
    });
};

// récupération d'un utilisateur avec l'id
exports.getUser = (req, res, next) => {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: "Veullez fournir l'id de l'utilisateur" });
    }
    dbConnection.query('SELECT * FROM users WHERE id_user=?', user_id, (error, results) => {
        if (error) throw error;
        return res.send({ error: false, message: results[0] });
    });
}

// création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    const userinfo = req.body.userinfo;
    // si les infos de l'user ne sont pas correcte
    if (!userinfo) {
        return res.status(400).send({ error, message: "Les champs ne sont pas complet" });
    }
    // connection à la bdd et insertion des données de l'utilisateur
    dbConnection.query("INSERT INTO users SET ?", userinfo, (error, results, fields) => {
        // on renvoie le resultat
        return res.send({ error: false, data: results, message: "L'utilisateur à bien été crée" });
    });
};

// mise a jour d'un utilisateur
exports.updateUser = (req, res) => {
    let user_id = req.params.id;
    let userinfo = req.body.userinfo;
    if (!user_id || !userinfo) {
        return res.status(400).send({ error: user, message: "Veullez fournir l'utilisateur and son id" });
    }
    dbConnection.query("UPDATE users SET ? WHERE id_user=?", [userinfo, user_id], (error, results) => {
        if (error) throw error;
        return res.send({ error: false, data: results, message: "L'utilisateur à bien été mis à jour" });
    });
};

exports.deleteUser = (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: false, message: "Veullez fournir l'id de l'utilisateur" });
    }
    dbConnection.query('DELETE FROM users WHERE id_user= ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ erro: false, data: results, message: "L'utilisateur à bien été supprimé" });
    });
}
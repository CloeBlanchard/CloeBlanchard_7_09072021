// import de bcrypt
const bcrypt = require('bcrypt');
// import du token d'authentification
const jwt = require('jsonwebtoken');
// import du cryptage de l'email
const cryptoJs = require('crypto-js');

// récupération de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    dbConnection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
};
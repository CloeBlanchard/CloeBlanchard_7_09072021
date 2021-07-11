// import de bcrypt
const bcrypt = require('bcrypt');
// import de jsonwebtoken
const jwt = require('jsonwebtoken');
// import de cryptojs
const cryptojs = require('crypto-js');
require('dotenv').config();

var key = cryptojs.enc.Hex.parse(process.env.key);
var iv = cryptojs.enc.Hex.parse(process.env.iv)

exports.getAllUsers = (req, res, next) => {
    dbConnection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
};
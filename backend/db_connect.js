const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    database: process.env.db
});

db.connect(function (error) {
    if (error) {
        return console.error("Erreur :" + error.message);
    }
})

module.exports = db;
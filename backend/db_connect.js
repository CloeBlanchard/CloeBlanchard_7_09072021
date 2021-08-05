// import de mysql
const mysql = require('mysql');
// import du gestionnaire de variable d'environnment
require('dotenv').config();

const dbConnection = mysql.createConnection({
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.db
});

dbConnection.connect(function (error) {
	if (error) {
		return console.error("Erreur :" + error.message);
	}
})

module.exports = dbConnection;
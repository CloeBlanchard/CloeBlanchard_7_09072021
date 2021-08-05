// variable
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();
// import du router d'utilisateur
const userRoutes = require('./routes/user');
// import du router des publications
const publicationRoutes = require('./routes/publication');
// import du router des commentaires
const commentaryRoutes = require('./routes/commentary');


// application
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// body parser
app.use(bodyParser.json());


// db connect
const dbConnection = mysql.createConnection({
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.db
});
dbConnection.connect();

// route des utilisateurs
app.use('/api/auth', userRoutes);
// middleware des modifications des fichier images
app.use('/images', express.static(path.join(__dirname, 'images')));
// routes des publications
app.use('/api', publicationRoutes);
// routes des commentaire
app.use('/api/response', commentaryRoutes);


module.exports = app;
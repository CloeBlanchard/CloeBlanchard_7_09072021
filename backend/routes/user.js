// import d'express
const express = require('express');
// Import du router express
const router = express.Router();
// Import du controllers des utilisateurs
const userCtrlrs = require('../controllers/user');

// import de la route de récupérations des utilisateurs
router.post('/users', userCtrlrs.getAllUsers);

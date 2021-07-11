// ajout d'express
const express = require('express');
// import du router d'express
const router = express.Router();
// import du user controler
const userCtrl = require('../controllers/user');

// import des routes post pour l'authentification
router.post('/', userCtrl.getAllUsers);

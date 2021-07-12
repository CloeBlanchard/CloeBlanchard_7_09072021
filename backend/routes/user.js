// import d'express
const expres = require('express');
// import du router
const router = expres.Router();
// import du controllers des utilisateur
const userCtrl = require('../controllers/user');

// import du router de récupération de tous les utilisateurs
router.get('/users', userCtrl.getAllUsers);
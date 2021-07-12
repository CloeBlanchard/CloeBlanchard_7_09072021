// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import du controllers des utilisateur
const userCtrl = require('../controllers/user');

// import du router de récupération de tous les utilisateurs
router.get('/users', userCtrl.getAllUsers);

// Export du router
module.exports = router;
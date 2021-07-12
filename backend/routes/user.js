// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import du controllers des utilisateur
const userCtrl = require('../controllers/user');

// import du router de récupération de tous les utilisateurs
router.get('/users', userCtrl.getAllUsers);
// import du router de récupération d'un utilsateur avec l'id
router.get('/user/:id', userCtrl.getUser);
// import de la creation d'un nouvel utilisateur
router.post('/signup', userCtrl.signup);
// import de la modification d'un utilisateur
router.put('/user/:id', userCtrl.updateUser);


// Export du router
module.exports = router;
// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import du controllers des utilisateur
const userCtrl = require('../controllers/user');
// import de l'authentification
const auth = require('../middleware/auth')

// import du router de récupération de tous les utilisateurs
router.get('/users', auth, userCtrl.getAllUsers);
// import du router de récupération d'un utilsateur avec l'id
router.get('/user/:id', auth, userCtrl.getUser);
// import de la creation d'un nouvel utilisateur
router.post('/signup', userCtrl.signup);
// import de la connexion d'un utilisateur
router.post('/login', userCtrl.login);
// import de la modification d'un utilisateur
router.put('/user/:id', auth, userCtrl.updateUser);
// import de la suppression d'un utilisateur
router.delete('/user/:id', auth, userCtrl.deleteUser)

// Export du router
module.exports = router;
// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import du controllers des commentaires
const commentaryCtrls = require('../controllers/commentary');
// import de multer
const multer = require('../middleware/multer-config');
// import de l'authentification
const auth = require('../middleware/auth');

// récupération d'un commentaire
router.get('/commentary/:id', auth, commentaryCtrls.getOneCommentary);
// récupération de tous les commentaires
router.get('/commentarys', auth, commentaryCtrls.getAllCommentarys);
// création d'un commentaire
router.post('/commentary', auth, commentaryCtrls.createCommentary);
// modification d'un commentaire
router.put('/commentary/:id', auth, commentaryCtrls.modifyCommentary);
// suppression d'un commentaire
router.delete('/commentary/:id', auth, commentaryCtrls.deleteCommentary);

// Export du router
module.exports = router;
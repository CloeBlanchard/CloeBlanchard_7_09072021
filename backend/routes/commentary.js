// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import du controllers des commentaires
const commentaryCtrls = require('../controllers/commentary');
// import de multer
const multer = require('../middleware/multer-config');

// récupération d'un commentaire
router.get('/commentary/:id', commentaryCtrls.getOneCommentary);
// récupération de tous les commentaires
router.get('/commentarys', commentaryCtrls.getAllCommentarys);
// création d'un commentaire
router.post('/commentary', multer, commentaryCtrls.createCommentary);
// modification d'un commentaire
router.put('/commentary/:id', multer, commentaryCtrls.modifyCommentary);
// suppression d'un commentaire
router.delete('/commentary/:id', commentaryCtrls.deleteCommentary);

// Export du router
module.exports = router;
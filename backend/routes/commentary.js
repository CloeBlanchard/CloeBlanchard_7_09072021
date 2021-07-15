// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import du controllers des commentaires
const commentaryCtrls = require('../controllers/commentary');

// récupération d'un commentaire
router.get('/commentary/:id', commentaryCtrls.getOneCommentary);

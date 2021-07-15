// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import de multer
const multer = require('../middleware/multer-config')
// import du controllers des publication
const publicationCtrls = require('../controllers/publication');
// import de l'authentification
const auth = require('../middleware/auth');


// récupération d'une publication
router.get('/publication/:id', auth, publicationCtrls.getOnePublication);
// récupération de toutes les publications
router.get('/publications', auth, publicationCtrls.getAllPublications);
// création d'une publication
router.post('/publication', auth, multer, publicationCtrls.createPublication);
// modification d'une publication
router.put('/publication/:id', auth, multer, publicationCtrls.modifyPublication);
// suppression d'une publication
router.delete('/publication/:id', auth, publicationCtrls.deletePublication);

// Export du router
module.exports = router;
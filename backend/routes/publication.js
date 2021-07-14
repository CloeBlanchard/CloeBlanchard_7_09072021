// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import de multer
const multer = require('../middleware/multer-config')
// import du controllers des publication
const publicationCtrls = require('../controllers/publication');


// récupération d'une publication
router.get('/publication/:id', publicationCtrls.getOnePublication);
// récupération de toutes les publications
router.get('/publications', publicationCtrls.getAllPublications);
// création d'une publication
router.post('/publication', multer, publicationCtrls.createPublication);
// modification d'une publication
router.put('/publication/:id', multer, publicationCtrls.modifyPublication);
// suppression d'une publication
// router.delete('/publication/:id', publicationCtrls.deletePublication);
// Export du router
module.exports = router;
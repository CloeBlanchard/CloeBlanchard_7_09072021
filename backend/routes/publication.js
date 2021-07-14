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
router.post('/publication', multer, publicationCtrls.createPublication);
router.put('/publication/:id', multer, publicationCtrls.modifyPublication);
// Export du router
module.exports = router;
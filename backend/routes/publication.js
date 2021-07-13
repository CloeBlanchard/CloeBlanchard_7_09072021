// import d'express
const express = require('express');
// import du router
const router = express.Router();
// import du controllers des publication
const publicationCtrls = require('../controllers/publication');


// récupération d'une publication
router.get('/publication/:id', publicationCtrls.getOnePublication);

// Export du router
module.exports = router;
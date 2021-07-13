// import de le connection de mysql
const dbConnection = require('../db_connect');
// import de file system
const fs = require('fs');

// récupération d'un seul post
exports.getOnePublication = (req, res) => {
    let post_id = req.params.id;
    if (!post_id) {
        return res.status(400).send({ error: true, message: "veuillez fournir l'id de la publication" });
    };
    // on récupère les infos de la publication et son id
    dbConnection.query(`SELECT * FROM posts WHERE id=?`, (error, result) => {
        if (error) throw error;
        // si pas 
        return res.status(200).json({ error: false, message : result});
    });
};
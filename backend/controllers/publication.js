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
    dbConnection.query(`SELECT * FROM publications WHERE id=?`, (error, result) => {
        if (error) throw error;
        // si pas 
        return res.status(200).json({ error: false, message : result});
    });
};
// création d'un publication
exports.createPublication = (req, res) => {
       id_user = req.body.id_user;
       titre = req.body.titre;
       corps_message = req.body.corps_message;
       image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
   dbConnection.query(`INSERT INTO publications SET ?` , {id_user, titre, corps_message, image}, (error, result) => {
       if (error) {
           console.log(error)
           return res.status(400).json ({ error })
   }
   return res.status(201).json({ message: ' Votre message a bien été posté !'})
   })
};

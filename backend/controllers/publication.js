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
    dbConnection.query('SELECT * FROM publications WHERE id=?', (error, result) => {
        if (error) throw error;
        // si pas 
        return res.status(200).json({ error: false, message : result});
    });
};
// création d'un publication
exports.createPublication = (req, res) => {
    let id_user = req.body.id_user;
    let titre = req.body.titre;
    let corps_message = req.body.corps_message;
    let image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // on se connecte puis envoie des infos de la publication dans la bdd
    dbConnection.query('INSERT INTO publications SET ?' , {id_user, titre, corps_message, image}, (error, result) => {
        // si erreur 
        if (error) {
           return res.status(400).json({ error: true, message: "vérifier les champs de saisies" });
        };
        // si pas d'erreur 
        return res.status(201).json({ error: false, message: "La publication à été crée !" });
    });
};
// modification d'une publication
exports.modifyPublication = (req, res) => {
    let id_user = req.body.id_user;
    let titre = req.body.titre;
    let corps_message = req.body.corps_message;
    let image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // on se connecte, changement des données puis envoie des données dans la bdd
    dbConnection.query('UPDATE publications SET ? WHERE id=?',  {id_user, titre, corps_message, image}, (error, result) =>  {
        // si erreur
        if (error) {
            return res.status(400).json({ error: true, message: "Vérifier les données saisies" });
        };
        // si pas d'erreur
        return res.status(201).json({ error: false, message: "Les données ont été mis à jour" });
    });
};
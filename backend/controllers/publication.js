// import de le connection de mysql
const dbConnection = require('../db_connect');

// récupération d'une seule publication
exports.getOnePublication = (req, res) => {
    const id = req.params.id;
    // si id n'est pas renseigné
    if (!id) {
        return res.status(400).send({ error: true, message: "veuillez fournir l'id de la publication" });
    };
    // on récupère les infos de la publication et son id
    dbConnection.query('SELECT * FROM publications WHERE id=?', id, (error, result) => {
        // si erreur
        if (error) throw error;
        // si pas d'erreur
        return res.status(200).send({ error: false, message : result });
    });
};
// récupération de toutes les publications
exports.getAllPublications = (req, res) => {
    // connexion à la bdd et récupération de toutes les publications
    dbConnection.query('SELECT * FROM publications', (error, result) => {
        if (error) throw error;
        return res.status(200).send({ error: false, message: result });
    });
}
// création d'une publication
exports.createPublication = (req, res) => {
    const id_user = req.body.id_user;
    const titre = req.body.titre;
    const corps_message = req.body.corps_message;
    const image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // on se connecte puis envoie des infos de la publication dans la bdd
    dbConnection.query('INSERT INTO publications SET ?' , {id_user, titre, corps_message, image}, (error) => {
        // si erreur 
        if (error) throw error;
        // si pas d'erreur 
        return res.status(201).send({ error: false, message: "La publication à été crée !" });
    });
};
// modification d'une publication
exports.modifyPublication = (req, res) => {
    const id = req.params.id;
    const titre = req.body.titre;
    const corps_message = req.body.corps_message;
    const image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // on se connecte, changement des données puis envoie des données dans la bdd
    dbConnection.query('UPDATE publications SET ? WHERE id=?',  [ titre, corps_message, image, id ], (error) =>  {
        // si erreur
        if (error) if (error) throw error;
        // si pas d'erreur
        return res.status(201).send({ error: false, message: "Les données ont été mis à jour" });
    });
};
// suppression d'une publication
exports.deletePublication = (req, res) => {
    const id = req.params.id;
    // connexion a la bdd et selectionne l'id de la publication
    dbConnection.query('SELECT * FROM publications WHERE id=?', id, (error, result) => {
        // si erreur
        if (!id) {
            console.log(error);
            return res.status(400).send({ error: true, data: result, message: error});
        };
        // si pas d'erreur connexion a la bdd et suppression de la publication
            dbConnection.query('DELETE FROM publications WHERE id=?', id, (err, res) => {
                // si erreur
                if (err) {
                    return res.status(400).send({ error: true, message: error });
                }
                
            });
            // si pas d'erreur
        return res.status(200).send({ error: false, message: "La publication à été supprimé !" });
    });
};
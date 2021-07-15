// import de le connection de mysql
const dbConnection = require('../db_connect');

// récupération d'un commentaire
exports.getOneCommentary = (req, res) => {
    let id = req.params.id;
    // si id n'est pas renseigné
    if (!id) {
        return res.status(400).send({ error: true, message: "Veuillez fournir l'id du commentaire" });
    };
    // on récupère les infos du commentaire et son id
    dbConnection.query('SELECT * FROM commentary WHERE id=?', id, (error, result) => {
        // si erreur
        if (error) throw error;
        // si pas d'erreur
        return res.status(200).send({ error: false, message: result });
    });
};

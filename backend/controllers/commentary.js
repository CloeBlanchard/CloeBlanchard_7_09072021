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
// récupération de tous les commentaires
exports.getAllCommentarys = (req, res) => {
    // connexion à la bdd et récupération de tous les commentaires
    dbConnection.query('SELECT * FROM commentary', (error, result) => {
        // si erreur
        if (error) throw error;
        // si pas d'erreur
        return res.status(200).send({ error: false, message: result});
    });
};
// création d'un commentaire
exports.createCommentary = (req, res) => {
    const id_post = req.body.id_post;
    const corps_commentaire = req.body.corps_commentaire;
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // connexion à la bdd puis envoie des infos de la publciation dans la bdd
    dbConnection.query('INSERT INTO commentary SET ?', {id_post, corps_commentaire, image}, (error) => {
        // si erreur
        if (error) {
            return res.status(400).send({ error: true, message: error });
        }
        // si pas d'erreur
        return res.status(201).send({ error: false, message: "la publication à été crée !" });
    });
};
// mise à jour d'un commentaire
exports.modifyCommentary = (req, res) => {
    const id = req.params.id;
    const corps_commentaire = req.body.corps_commentaire;
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // connexion à la bdd, changement puis envoie des données dans la bdd
    dbConnection.query('UPDATE commentary SET corps_commentaire=?, image=? WHERE id=?', [corps_commentaire, image, id], (error) => {
        // si erreur
        if (error) {
            return res.status(400).send({ error: true, message: error });
        }
        return res.status(201).send({ error: false, message: "Les données ont été mis à jour" });
    });
};
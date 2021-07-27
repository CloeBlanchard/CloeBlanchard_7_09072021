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
    dbConnection.query('SELECT * FROM commentarys WHERE id=?', id, (error, result) => {
        // si erreur
        if (error) throw error;
        // si pas d'erreur
        return res.status(200).send({ error: false, message: result });
    });
};
// récupération de tous les commentaires
exports.getAllCommentarys = (req, res) => {
    // connexion à la bdd et récupération de tous les commentaires
    dbConnection.query('SELECT * FROM commentarys', (error, result) => {
        // si erreur
        if (error) throw error;
        // si pas d'erreur
        return res.status(200).send({ error: false, message: result });
    });
};
// création d'un commentaire
exports.createCommentary = (req, res) => {
    const corps_commentaire = req.body.corps_commentaire;
    const image = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
    // connexion à la bdd puis envoie des infos de la publciation dans la bdd
    dbConnection.query('INSERT INTO commentarys SET ?', { corps_commentaire, image }, (error) => {
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
    // on récupère les infos du commentaire et son id
    dbConnection.query('SELECT * FROM commentarys WHERE id=?', req.params.id, (error, result) => {
        // si erreur
        if (error) { throw error; }
        else {
            if (req.token.user_id == result[0].id_user || req.token.roleAdmin) {
                const id = req.params.id;
                const corps_commentaire = req.body.corps_commentaire;
                const image = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
                // connexion à la bdd, changement puis envoie des données dans la bdd
                dbConnection.query('UPDATE commentarys SET corps_commentaire=?, image=? WHERE id=?', [corps_commentaire, image, id], (error) => {
                    // si erreur
                    if (error) {
                        return res.status(400).send({ error: true, message: error });
                    }
                    return res.status(201).send({ error: false, message: "Les données ont été mis à jour" });
                });
            } else {
                // si erreur
                return res.status(401).send({ error: true, message: "Vous n'avez pas les droits" });
            }
        }
        // si pas d'erreur
        return res.status(200).send({ error: false, message: result });
    });

};
// suppression d'un commentaire
exports.deleteCommentary = (req, res) => {
    // on récupère les infos du commentaire et son id
    dbConnection.query('SELECT * FROM commentarys WHERE id=?', req.params.id, (error, result) => {
        // si erreur
        if (error) { throw error; }
        else {
            if (req.token.user_id == result[0].id_user || req.token.roleAdmin) {
                const id = req.params.id;
                // connexion à la bdd et selectionne l'id du commentaire
                dbConnection.query('SELECT * FROM commentarys WHERE id=?', id, (error) => {
                    // si erreur
                    if (!id) {
                        return res.status(400).send({ error: true, message: error })
                    } else {
                        // si pas d'erreur, connexion à la bdd et suppression de la publication
                        dbConnection.query('DELETE FROM commentarys WHERE id=?', id, (err) => {
                            // si erreur
                            if (err) {
                                return res.status(400).send({ error: true, message: err });
                            };
                        });
                        // si pas d'erreur
                        return res.status(200).send({ error: false, message: "Le commentaire à été supprimé !" });
                    };
                });
                return res.status(200).send({ error: false, message: "Commentaire supprimé !" });
            } else {
                // si erreur
                return res.status(401).send({ error: true, message: "Vous n'avez pas les droits" });
            }
        }
    })
}
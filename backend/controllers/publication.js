// import de le connection de mysql
const dbConnection = require('../db_connect');
// import de file system
const fs = require('fs');

// récupération d'une seule publication
exports.getOnePublication = (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: "veuillez fournir l'id de la publication" });
    };
    // on récupère les infos de la publication et son id
    dbConnection.query('SELECT * FROM publications WHERE id=?', id, (error, result) => {
        // si erreur
        if (error) throw error;
        // si pas d'erreur
        return res.status(200).send({ error: false, message : result});
    });
};
// récupération de toutes les publications
exports.getAllPublications = (req, res) => {
    dbConnection.query('SELECT * FROM publications', (error, result) => {
        if (error) throw error;
        return res.send({ error: false, message: result });
    });
}
// création d'une publication
exports.createPublication = (req, res) => {
    let id_user = req.body.id_user;
    let titre = req.body.titre;
    let corps_message = req.body.corps_message;
    let image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // on se connecte puis envoie des infos de la publication dans la bdd
    dbConnection.query('INSERT INTO publications SET ?' , {id_user, titre, corps_message, image}, (error) => {
        // si erreur 
        if (error) if (error) throw error;
        // si pas d'erreur 
        return res.status(201).send({ error: false, message: "La publication à été crée !" });
    });
};
// modification d'une publication
exports.modifyPublication = (req, res) => {
    let id = req.params.id;
    let titre = req.body.titre;
    let corps_message = req.body.corps_message;
    let image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // on se connecte, changement des données puis envoie des données dans la bdd
    dbConnection.query('UPDATE publications SET ? WHERE id=?',  [ titre, corps_message, image, id ], (error) =>  {
        // si erreur
        if (error) if (error) throw error;
        // si pas d'erreur
        return res.status(201).send({ error: false, message: "Les données ont été mis à jour" });
    });
};
// suppression d'une publication
// exports.deletePublication = (req, res) => {
//     let public_id = req.params.id;
//     // connexion à la bdd et suppression de la publication
//     dbConnection.query('SELECT * FROM publications WHERE id=?', public_id, (error) => {
//         // si l'id de publication ne correspond pas
//         if (error) {
//             return res.status(400).send({ error: false, message: "Veullez fournir l'id de la publication" });
//         }
//         let imageUrl =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//         let filename = imageUrl.image.split('/images/')[1];
//         fs.unlink(`images/${filename}`, () => {
//             dbConnection.query('DELETE FROM publications WHERE id=?', [public_id, filename], (error) => {
//                 if (error) {
//                     return res.status(400).send({ error: true, message: error});
//                 };
//                 return res.status(200).send({ error: false, message: "Publication supprimé" });
//             });
//         });
//     });
// }
// exports.deletePublication = (req, res) => {
//     let  id = req.params.id;
//     dbConnection.query('SELECT * FROM publications WHERE id=?', id, (error, result) => {
//         if (error) {
//             return res.status(400).json({ error });
//         } else {
//             const imageRes = result;
//             const filename = imageRes[0].image;
//             fs.unlink(`images/${filename}`, () => {
//                 dbConnection.query('DELETE * FROM publications WHERE id=?', id, (error, result) => {
//                     if (error) {
//                         return res.status(400).json({ error });
//                     };
//                     return res.status(20).json({ error: false, message: result });
//                 });
//             });
//         };
//     });
// };
// let public_id = req.params.id;
    // let  imageRes =  res;
    // let filename = imageRes[0].image;
    // // si l'utilisateur ne correspond pas
    // if (!public_id) {
    //     return res.status(400).json({ error: true, message: error});
    // };
    // fs.unlink(`image/${filename}`, () => {
    //     // connexion à la bdd et suppression de la publication
    //     dbConnection.query('DELETE FROM publications WHERE id=?', [public_id], (error) => {
    //         if (error) throw error;
    //         return res.send({ error: false, message: "Publication supprimé"});
    //     });
// })


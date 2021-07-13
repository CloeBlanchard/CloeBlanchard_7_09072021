// import de bcrypt
const bcrypt = require('bcrypt');
// import de jswebtoken
const jwt = require('jsonwebtoken');
// import de mysql
const mysql = require('mysql');
// import du gestionnaire d'environnement
require('dotenv').config();
// import de le connection de mysql
const dbConnection = require('../db_connect');


// récupération de tous les utilisateurs
exports.getAllUsers = (req, res) => {
    dbConnection.query('SELECT * FROM users', (err, result) => {
        if (err) throw err;
        return res.send({ error: false, message: result });
    });
};

// récupération d'un utilisateur avec l'id
exports.getUser = (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: "Veullez fournir l'id de l'utilisateur" });
    }
    dbConnection.query('SELECT * FROM users WHERE id_user=?', user_id, (error, results) => {
        if (error) throw error;
        return res.send({ error: false, message: results[0] });
    });
}

// création d'un nouvel utilisateur
exports.signup = (req, res) => {
    // chiffrement du mdp
    bcrypt.hash(req.body.mot_de_passe, 10) 
        .then((hash) => {
            req.body.mot_de_passe = hash;
            // entré de l'email dans la bdd
            dbConnection.query('SELECT * from users WHERE email=?', req.body.email, (err, res) => {
                // si erreur, renvoie de l'erreur
                if (err) {
                    return res.status(400).json({ error });
                } else {
                    // sinon entré de la requête dans la bdd
                    dbConnection.query('INSERT INTO users SET ?', req.body, (err, res) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).json({ error: true, message: "Certains champs sont vide, verifiez votre saisi !" });
                        };
                        return res.status(201).json({ error: false, message : "L'utilisateur à bien été crée !" });
                    });
                };
            });
        }); 
}

// connecter un utilisateur
exports.login = (req, res) => {
    // envoie de l'email et du mot de passe dans la bdd
    if (req.body.email && req.body.mot_de_passe){
        // connexion à la bdd
      dbConnection.query('SELECT * FROM users WHERE email=?', req.body.email, (err, result) => {
            // Vérifie que le mail correspond à celui envoyer dans la bdd
            if (result.length <= 0){
                return res.status(500).json({ error: true, message: "L'email est inconnue à la base de donnée"});
            } else {
                bcrypt.compare(req.body.mot_de_passe, result[0].mot_de_passe)
                .then(valid => {
                    if(!valid){
                        return res.status(500).json({ error: true, message: "Email ou mot de passe incorrect"});
                    } else {
                        res.status(200).json({
                            user_id: result[0].id,
                            nom: result[0].nom,
                            prenom: result[0].prenom,
                            token: jwt.sign({
                                user_id: result[0].id
                            }, process.env.TOKEN, {
                                expiresIn: '24h'
                            })
                        });
                    }
                    })
                .catch(() => {
                    return res.status(500).json({ error })
                })
            }
        })
    }
}
// mise a jour d'un utilisateur
exports.updateUser = (req, res) => {
    let user_id = req.params.id;
    let userinfo = req.body.userinfo;
    if (!user_id || !userinfo) {
        return res.status(400).send({ error: user, message: "Veullez fournir l'utilisateur and son id" });
    }
    dbConnection.query("UPDATE users SET ? WHERE id_user=?", [userinfo, user_id], (error, results) => {
        if (error) throw error;
        return res.send({ error: false, data: results, message: "L'utilisateur à bien été mis à jour" });
    });
};

exports.deleteUser = (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: false, message: "Veullez fournir l'id de l'utilisateur" });
    }
    dbConnection.query('DELETE FROM users WHERE id_user= ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ erro: false, data: results, message: "L'utilisateur à bien été supprimé" });
    });
}
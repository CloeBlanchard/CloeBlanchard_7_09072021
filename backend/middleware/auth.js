// import de jsonwebtoken
const jwt = require('jsonwebtoken');

// Protection des routes et vérifiera que les user soient authentifié avant autorisation d'envoie 
// de requete
module.exports = (req, res, next) => {
    try {
        // Récupération du deuxième élément du tableau de token
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token avec le packe jsonwebtoken
        req.token = jwt.verify(token, process.env.Token);
        
            next();
    } catch {
        res.status(401).json({
            error: new Error('Requete invalide !')
        });
    }
};
-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 03 août 2021 à 15:45
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_projet7`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentarys`
--

DROP TABLE IF EXISTS `commentarys`;
CREATE TABLE IF NOT EXISTS `commentarys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_post` int NOT NULL,
  `id_user` int NOT NULL,
  `corps_commentaire` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `crée_le` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_post` (`id_post`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

DROP TABLE IF EXISTS `publications`;
CREATE TABLE IF NOT EXISTS `publications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `titre` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `corps_message` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `crée_le` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id`, `id_user`, `titre`, `corps_message`, `image`, `crée_le`) VALUES
(37, 26, 'Bienvenue', 'Bienvenue sur le réseau social de votre entreprise. Vous pouvez créer une publication et y ajouter des commentaires', 'http://localhost:3000/images/i1627938331362.png', '2021-08-02 23:05:31');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mot_de_passe` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleAdmin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `creer_le` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `roleAdmin`, `creer_le`) VALUES
(26, 'Jerome', 'Dupres', 'compte.admin@groupomania.com', '$2b$10$GFHr/CcxXozwRuBb1I1RMuOltCXSNsF5k.emmiT9zImbn8PHnsnQC', '1', '2021-07-31 13:05:19');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentarys`
--
ALTER TABLE `commentarys`
  ADD CONSTRAINT `commentarys_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `publications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentarys_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

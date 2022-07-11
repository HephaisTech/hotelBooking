-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 11 juil. 2022 à 22:18
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bookingme`
--

-- --------------------------------------------------------

--
-- Structure de la table `book`
--

CREATE TABLE `book` (
  `id` text NOT NULL,
  `idroom` int(11) NOT NULL,
  `idguest` int(11) NOT NULL,
  `fromdate` datetime NOT NULL,
  `todate` datetime NOT NULL,
  `personcount` int(11) NOT NULL,
  `extraservice` decimal(10,3) DEFAULT NULL,
  `paymethod` varchar(255) NOT NULL,
  `total` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `book`
--

INSERT INTO `book` (`id`, `idroom`, `idguest`, `fromdate`, `todate`, `personcount`, `extraservice`, `paymethod`, `total`) VALUES
('6b193c72cabffa198f4a33de49182f7a216fb52475637f82f4c3a0d4a00c065b', 1, 2, '2012-04-23 18:25:43', '2015-10-26 07:46:36', 3, '50000.000', 'paypal', '0.000'),
('742964ecf09221b466623fbb3e23a4791c5f98594cec98b6f6902a4a1b758fd3', 1, 2, '2022-07-11 12:25:43', '2022-07-16 12:46:36', 2, '50000.000', 'paypal', '60000.000'),
('fa6b2c11f089955a27d12baea4570cd0402860c7d52a20b25885b2f950645e48', 1, 2, '2022-07-11 12:25:43', '2022-07-16 12:46:36', 2, '50000.000', 'paypal', '110000.000'),
('8ec7e162a1a9354c3c4849346b98c2e4a12413b0fa976e4a6b67a85ce67e2da9', 1, 2, '2022-07-11 12:25:43', '2022-07-15 12:46:36', 2, '50000.000', 'paypal', '100000.000'),
('c9a1d0fce7ddbf0f9683a7245b2cc6575a03ace920b3a5fa0ddfd298e491ae14', 1, 2, '2022-07-11 12:25:43', '2022-07-15 12:46:36', 2, '50000.000', 'paypal', '100000.000'),
('40916f9566860ca1fd522d5572b2e30e22a44e75d1e0873786a9e60708854d39', 1, 2, '2022-07-11 12:25:43', '2022-07-14 12:46:36', 2, '50000.000', 'paypal', '90000.000');

-- --------------------------------------------------------

--
-- Structure de la table `guest`
--

CREATE TABLE `guest` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT 'none',
  `profession` varchar(100) DEFAULT NULL,
  `profil` text DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `Telephone` varchar(30) DEFAULT NULL,
  `Email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `documentId` varchar(30) DEFAULT NULL,
  `document_type` varchar(30) DEFAULT NULL,
  `isCompany` tinyint(1) DEFAULT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `guest`
--

INSERT INTO `guest` (`id`, `name`, `gender`, `profession`, `profil`, `country`, `Telephone`, `Email`, `password`, `company`, `documentId`, `document_type`, `isCompany`, `createAt`) VALUES
(2, 'marius', 'none', NULL, 'http://localhost:5000/images/guests/FB_IMG_1643056589972_21657126266032.jpg', NULL, NULL, 'email@gmail.com', '$2b$10$DWizPoVqEPGAG1vQY7OnmOo4N2AGGVRG4oo1sHNjQQDkvGd2YLHRe', NULL, NULL, NULL, NULL, '2022-07-06 15:22:10');

-- --------------------------------------------------------

--
-- Structure de la table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `photos` longtext DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `descrip` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `rating` int(1) DEFAULT NULL,
  `rooms` longtext DEFAULT NULL,
  `cheapestPrice` decimal(10,3) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT NULL,
  `createdat` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `title`, `address`, `longitude`, `latitude`, `telephone`, `city`, `country`, `photos`, `type`, `descrip`, `email`, `website`, `rating`, `rooms`, `cheapestPrice`, `featured`, `createdat`) VALUES
(15, 'azure.com', 'title', 'address', 'longitude', 'latitude', 'telephonee', 'city', 'country', '[\"http://localhost:5000/images/hotels/FB_IMG_1643056589972_21657032064175.jpg\",\"http://localhost:5000/images/hotels/00100sPORTRAIT_00100_BURST20220327133334664_COVER1657032064176.jpg\",\"http://localhost:5000/images/hotels/00100sPORTRAIT_00100_BURST20220327133529720_COVER_21657032064219.jpg\"]', 'type', 'descrip', 'email', 'website', 5, 'rooms', '10000.000', 1, '2022-07-05 14:41:04');

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `hotelid` int(11) NOT NULL,
  `number` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `descript` text DEFAULT NULL,
  `floor` int(11) UNSIGNED DEFAULT NULL,
  `rating` int(11) UNSIGNED DEFAULT NULL,
  `ratcount` int(11) UNSIGNED DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0,
  `photos` longtext DEFAULT NULL,
  `price` decimal(10,3) UNSIGNED DEFAULT NULL,
  `maxpeople` int(11) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `rooms`
--

INSERT INTO `rooms` (`id`, `hotelid`, `number`, `title`, `descript`, `floor`, `rating`, `ratcount`, `status`, `photos`, `price`, `maxpeople`, `createdAt`) VALUES
(1, 15, 1, NULL, NULL, NULL, NULL, NULL, 0, '[]', '10000.000', 3, '2022-07-05 17:07:06');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `guest`
--
ALTER TABLE `guest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

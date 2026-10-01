-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2026 at 10:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intervplus_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_auth`
--

CREATE TABLE `admin_auth` (
  `id` int(11) NOT NULL,
  `code_secret` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_auth`
--

INSERT INTO `admin_auth` (`id`, `code_secret`) VALUES
(1, '1234');

-- --------------------------------------------------------

--
-- Table structure for table `interventions`
--

CREATE TABLE `interventions` (
  `id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `date_intervention` date NOT NULL,
  `description` text DEFAULT NULL,
  `technicien_id` int(11) DEFAULT NULL,
  `statut` varchar(50) DEFAULT 'En attente',
  `valide` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interventions`
--

INSERT INTO `interventions` (`id`, `titre`, `date_intervention`, `description`, `technicien_id`, `statut`, `valide`) VALUES
(1, 'Réparation Fuite', '2026-01-23', 'Fuite sous évier', 1, 'En cours', 0),
(2, 'Panne Ascenseur', '2026-01-24', 'Blocage complet au 3ème étage, urgence signalée.', 1, 'Urgente', 0),
(3, 'Révision Chaudière', '2026-01-20', 'Maintenance annuelle effectuée avec succès.', 1, 'Traitée', 1);

-- --------------------------------------------------------

--
-- Table structure for table `techniciens`
--

CREATE TABLE `techniciens` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `specialite` varchar(100) DEFAULT NULL,
  `statut` varchar(50) DEFAULT 'Actif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `techniciens`
--

INSERT INTO `techniciens` (`id`, `nom`, `email`, `mot_de_passe`, `specialite`, `statut`) VALUES
(1, 'Ahmed', 'ahmed@test.com', '123456', 'Climatisation', 'Actif'),
(2, 'Eya', 'eya@test.com', 'eya123', 'Superviseur', 'Actif');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_auth`
--
ALTER TABLE `admin_auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interventions`
--
ALTER TABLE `interventions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `technicien_id` (`technicien_id`);

--
-- Indexes for table `techniciens`
--
ALTER TABLE `techniciens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `interventions`
--
ALTER TABLE `interventions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `techniciens`
--
ALTER TABLE `techniciens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `interventions`
--
ALTER TABLE `interventions`
  ADD CONSTRAINT `interventions_ibfk_1` FOREIGN KEY (`technicien_id`) REFERENCES `techniciens` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

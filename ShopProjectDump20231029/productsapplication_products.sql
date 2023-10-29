-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: productsapplication
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` varchar(36) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('0b40e27f-4432-47c2-8285-0641f3c5bac4','Еще тест','Еще тест',0.00),('34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','Galaxy A52','333A mid-range smartphone with a large battery and display.',17999.25),('36239a24-f71d-4f11-a93e-506775f882e9','Pixel 6','A high-end smartphone with cutting-edge technology.',56999.00),('38ee460d-ef78-4c3c-994f-50aab6eba977','простой тест','https://via.placeholder.com/150/f66b97',555.00),('4656c9d4-640a-4762-9841-430737b344e1','Тест 2','Тест3',123.45),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','Nova 8i','A mid-range smartphone with a large display and great camera.',11999.50),('6f1a6b96-6cd2-439c-a648-88b9f287f7d2','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00),('7d369911-b0a8-4f39-929d-97b9e9769425','newImages','newImages',NULL),('9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c','iPhone SE','A compact and affordable iPhone with great performance.',38999.50),('a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58','Galaxy Z Flip 3-1','A foldable smartphone with a unique design.',79999.00),('e144947e-3af7-4d3c-8327-ecf39255617d','Zenfone 8-4','A compact smartphone with premium features.',25999.75),('e53a34c6-9838-4f3e-849f-00a49dd64ab0','Test','Test1',123.45),('efd82d85-8dd6-4979-bf5c-96933d9c2f7d','Redmi Note 11','A budget-friendly smartphone with a powerful processor.',7999.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-29 15:06:30

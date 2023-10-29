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
-- Table structure for table `similars`
--

DROP TABLE IF EXISTS `similars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `similars` (
  `row_id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `similar_id` varchar(36) NOT NULL,
  PRIMARY KEY (`row_id`),
  KEY `product_id` (`product_id`),
  KEY `similar_id` (`similar_id`),
  CONSTRAINT `similars_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `similars_ibfk_2` FOREIGN KEY (`similar_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `similars`
--

LOCK TABLES `similars` WRITE;
/*!40000 ALTER TABLE `similars` DISABLE KEYS */;
INSERT INTO `similars` VALUES ('00b91df5-4cb8-4789-925f-ecefa6689580','Pixel 6','A high-end smartphone with cutting-edge technology.',56999.00,'5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','e144947e-3af7-4d3c-8327-ecf39255617d'),('0ad21be4-9ec7-44d4-9920-99951386c2f7','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00,'5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('302eb863-8a4c-4704-89f0-6d31d7f35229','Galaxy A52','333A mid-range smartphone with a large battery and display.',17999.25,'0b40e27f-4432-47c2-8285-0641f3c5bac4','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('3debf34e-5be2-48ac-8b8e-4c470d2fea37','777777','77777777777777777777777777777777777777',10.23,'34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('43d081b1-1d14-450d-925e-bc802ad85d93','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00,'34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('4e660812-36f0-4f07-95de-bcb1ab2ef8bd','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00,'5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c'),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b931','Nova 8i','A mid-range smartphone with a large display and great camera.',11999.50,'e144947e-3af7-4d3c-8327-ecf39255617d','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b934','Redmi Note 11','A budget-friendly smartphone with a powerful processor.',7999.00,'e144947e-3af7-4d3c-8327-ecf39255617d','efd82d85-8dd6-4979-bf5c-96933d9c2f7d'),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b935','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00,'e144947e-3af7-4d3c-8327-ecf39255617d','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b936','iPhone SE','A compact and affordable iPhone with great performance.',38999.50,'a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c'),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b937','Galaxy Z Flip 3','A foldable smartphone with a unique design.',79999.00,'9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b945','Galaxy A52','A mid-range smartphone with a large battery and display.',17999.25,'e144947e-3af7-4d3c-8327-ecf39255617d','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('6768320f-18fb-4619-b678-419a4ed48b2d','Galaxy A52','333A mid-range smartphone with a large battery and display.',17999.25,'0b40e27f-4432-47c2-8285-0641f3c5bac4','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('80c92dbe-049e-44d2-af87-5a3d09994f04','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00,'5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('929f4a49-6685-43cb-a5ca-0e614c8522d0','Pixel 6','A high-end smartphone with cutting-edge technology.',56999.00,'38ee460d-ef78-4c3c-994f-50aab6eba977','36239a24-f71d-4f11-a93e-506775f882e9'),('962e1e84-7d1b-43dc-86c2-51498ee5b659','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00,'34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c'),('c743e51c-7093-4b0d-8830-8c7ba7773cd4','Galaxy A52','333A mid-range smartphone with a large battery and display.',17999.25,'6f1a6b96-6cd2-439c-a648-88b9f287f7d2','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('d670ee07-68f2-4da5-a368-2cf037660c8f','Pixel 6','A high-end smartphone with cutting-edge technology.',56999.00,'5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','36239a24-f71d-4f11-a93e-506775f882e9'),('ee70fe33-5abb-4942-924a-7ed07f1f660b','Galaxy A52','333A mid-range smartphone with a large battery and display.',17999.25,'5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('f4a8ef86-f458-4fb9-8070-70c68a153bb4','Galaxy A52','333A mid-range smartphone with a large battery and display.',17999.25,'0b40e27f-4432-47c2-8285-0641f3c5bac4','38ee460d-ef78-4c3c-994f-50aab6eba977');
/*!40000 ALTER TABLE `similars` ENABLE KEYS */;
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

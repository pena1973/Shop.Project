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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `product_id` varchar(36) NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('028819d7-6b5a-4bfe-962c-743a3dca62f5','vbnbvn','@lnv/\'dcfkvn','b\\fgj[thjdmf','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('0a082114-3a06-4266-8c4a-a0df7b8ac60f','reteert','@ \'v;pkjc','fgnddn','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('0cdafbb6-625f-4da7-bd5b-59cd83385642','name','hh@email','body','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('19a10fbd-05c2-4b19-8c5d-b1c14a61bb82','dfoswgfdspugf','@;lksbdhf','dsbhdsfhs','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('479337e8-a000-48e8-8133-3af35d1c64c3','o\'o;iol;u','@\';bvl\'c','xcbxcbx','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('4f3d80cd-4a02-4532-870d-323b1196012d','name','hh@email','body','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('6dfb448b-df24-4b05-8965-676e433b9a','name','1Eliseo@gardner.biz','body','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('6dfb448b-df24-4b05-8965-676e433b9a41','1id labore ex et quam laborum','1Eliseo@gardner.biz','1laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('82a6ef1b-cef5-4e30-b1e8-4fb98755e047','name','hh@email','body','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('82c18e4c-4341-46a4-aecd-64c025f4d47c','Мой комент1','@хкешнгхщкн','Мой комент\nМой комент\nМой комент\nМой комент','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('879df716-b173-4e99-92dc-c8877fe113d5','гшщгшщ','@хкешнгхщкн','ъкхще\nкенкуц\nцкнр\nцкнур','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('8e99ab9d-6047-45f3-b55f-992f62f70b11','jfjg','@ljgfb','xcvbhndf','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('a080cd6f-350e-47a7-a127-b411d0079f74','name','hh@email','body','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('b15a2ff6-92c7-4f10-8007-0e4d860f182e','name','hh@email','body','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('b5bdb2f8-784c-494e-aaef-37dfcca1d80c','22222222','2@3','rfgdsdfg22222222222','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('bd24a462-e7ef-4612-9153-12df2f529042','name','hh@email','body','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('dc698fee-e47b-11ed-b5ea-0242ac120002','12id labore ex et quam laborum','12Eliseo@gardner.biz','12laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('dc699412-e47b-11ed-b5ea-0242ac120002','quo vero reiciendis velit similique earum','Jayne_Kuhic@sydney.com','est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('dc69b7b2-e47b-11ed-b5ea-0242ac120002','eaque et deleniti atque tenetur ut quo ut','Carmen_Keeling@caroline.name','voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('e36d464b-5d30-45ff-a4c9-6238b092efbb','Мой комент','@хкешнгхщкн','Мой комент\nМой комент\nМой комент\nМой комент','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('e8a7137a-bb25-4098-ad34-8e37a8f89fdd','мии','@dcvjsxv','xbcvx','6f1a6b96-6cd2-439c-a648-88b9f287f7d2');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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

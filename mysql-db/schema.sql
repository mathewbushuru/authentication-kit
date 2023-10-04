-- @block
SHOW DATABASES;

-- @block
CREATE DATABASE authkitDB; 

-- @block
USE authkitDB; 

-- @block
SHOW TABLES;

-- @block
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `hashedPassword` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(20),
    `emailNotifications`  BOOLEAN DEFAULT(1),
    `emailVerified` BOOLEAN DEFAULT(0),
    `createdAt` TIMESTAMP NOT NULL DEFAULT(now()),
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- @block
SELECT * from users;

-- @block
INSERT INTO users (
    `username`,
    `email`,
    `hashedPassword`,
    `phoneNumber`,
    `emailNotifications`,
    `emailVerified`
) VALUES (
    'matt','matt@test.com','$2b$10$3skTm/x4dnefAcjq0oAad.sYgWiMQLk4wafN4Z8iO058TJPNQEBei', '123-456-7890', 0, 0
);

-- @block
ALTER TABLE users
    ADD COLUMN `newColumn` VARCHAR(255) NOT NULL,
    ADD COLUMN `newColumn2` VARCHAR(255) NOT NULL  UNIQUE;

-- @block
DROP DATABASE authkit;
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
    `password` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(20),
    `emailNotifications`  BOOLEAN DEFAULT(1),
    `createdAt` TIMESTAMP NOT NULL DEFAULT(now())
);

-- @block
SELECT * from users;

-- @block
INSERT INTO users (
    `username`,
    `email`,
    `password`,
    `phoneNumber`,
    `emailNotifications`
) VALUES (
    'matt','matt@test.com','tester123', '123-456-7890', 0
);

-- @block
DROP DATABASE authkit;
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
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT(now())
);

-- @block
SELECT * from users;

-- @block
INSERT INTO users (
    `firstName`,
    `lastName`,
    `email`,
    `password`
) VALUES (
    'Mathew','B','mathew@test.com','tester123'
);
SELECT * FROM users;

-- @block
DROP DATABASE authkit;
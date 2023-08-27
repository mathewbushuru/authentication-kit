--  @block
SHOW DATABASES;

--  @block
CREATE DATABASE testDB;

-- @block
USE testDB;

-- @block
SHOW TABLES;

-- @block 
DROP TABLE testDB;

-- @block 
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT(now())
);

-- @block 
INSERT INTO users (first_name, last_name) VALUES ("Mathew", "B");

-- @block
SELECT * FROM users;

--  @block
DROP DATABASE testDB;
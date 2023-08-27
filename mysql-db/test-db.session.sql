-- @block
USE TEST;

-- @block
SHOW TABLES;

-- @block 
DROP TABLE testDB;

-- @block 
CREATE TABLE testDB (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT(now())
);

-- @block 
INSERT INTO testDB (first_name, last_name) VALUES (
    "Mathew",
    "B"
);

-- @block
SELECT * FROM testDB;
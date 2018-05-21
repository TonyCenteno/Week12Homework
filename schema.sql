DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INT(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mens straw hat", "hats", 30.00, 50), 
        ("black wutang shirt", "shirts", 22.00, 50),
        ("white wutang shirt", "shirts", 22.00, 50),
        ("red short shorts", "shorts and pants", 25.00, 50),
        ("blue short shorts", "shorts and pants", 25.00, 50),
        ("black pants", "shorts and pants", 28.00, 50),
        ("white pants", "shorts and pants", 28.00, 50),
        ("grey hoodie", "sweaters and hoodies", 30.00, 50),
        ("black hoodie", "sweaters and hoodies", 30.00, 50),
        ("white hoodie", "sweaters and hoodies", 30.00, 50);


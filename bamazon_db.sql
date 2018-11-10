DROP DATABASE IF EXISTS  bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
 
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(50) NOT NULL,
 price DECIMAL NOT NULL,
 stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name,  department_name, price, stock_quantity)
VALUES("football", "Sporting Goods", 9.99, 200),
("basketball", "Sporting Goods", 5.99, 300),
("golf club set", "Sporting Goods", 199.99, 50),
("bath towel", "Home Decor", 4.99, 350),
("standing mirror", "Home Decor", 54.99, 30),
("decorative pillow", "Home Decor", 24.99, 125),
("desk mirror", "Home Decor", 34.99, 60),
("toothpaste", "Personal Care", 2.99, 400),
("body wash", "Personal Care", 5.99, 300),
("comb", "Personal Care", .99, 1500);

SELECT * FROM products;
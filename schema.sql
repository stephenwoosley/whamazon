CREATE DATABASE whamazon;

USE whamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Forester", "new_cars", "27999", 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru WRX STI", "new_cars", "32499", 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Outback", "new_cars", "29749", 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Crosstrek", "new_cars", "24999", 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Legacy", "new_cars", "25799", 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Impreza", "new_cars", "21999", 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru WRX", "used_cars", "14999", 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Forester", "used_cars", "17749", 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Outback", "used_cars", "22499", 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Subaru Impreza", "used_cars", "12999", 1);

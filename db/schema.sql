DROP DATABASE IF EXISTS getmed_DB;

CREATE database getmed_DB;

USE getmed_DB;
CREATE TABLE pharmacy (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,
street VARCHAR(100) NOT NULL,
city VARCHAR(100) NOT NULL,
state_abbr VARCHAR(2) NOT NULL,
zipcode VARCHAR(5) NOT NULL,
phone VARCHAR(10) NOT NULL,
PRIMARY KEY (id)
);

USE getmed_DB;
CREATE TABLE driver (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
street VARCHAR(100),
city VARCHAR(100),
state_abbr VARCHAR(2),
zipcode VARCHAR(5)L,
phone VARCHAR(10),
vehicle_num VARCHAR(10) NOT NULL,
driver_License VARCHAR(10) NOT NULL,,
PRIMARY KEY (id)
);

USE getmed_DB;
CREATE TABLE customer (
id INT NOT NULL AUTO_INCREMENT,
email,
password,
fname VARCHAR(20) NOT NULL,
lname VARCHAR(20) NOT NULL,
street VARCHAR(100),
city VARCHAR(100),
state_abbr VARCHAR(2),
zipcode VARCHAR(5),
ccard VARCHAR(16),
phid VARCHAR(10);
phaccount VARCHAR(10),
PRIMARY KEY (id),
FOREIGN KEY (pharm_id) REFERENCES pharmacy(id)
);

USE getmed_DB;
CREATE TABLE order (
order_id INT NOT NULL AUTO_INCREMENT,
cust_id INT NOT NULL,
med_id INT NOT NULL,
pharm_id INT NOT NULL,
driver_id INT NOT NULL,
category VARCHAR,
quantity INT,
total_quantity INT,
med_price DECIMAL (10,2),
total_price DECIMAL (10,2),
status VARCHAR(1) DEFAULT 1,
PRIMARY KEY (order_id, cust_id, med_id),
FOREIGN KEY (cust_id REFERENCES customer(id),
FOREIGN KEY (driver_id) REFERENCES driver(id),
FOREIGN KEY (pharm_id) REFERENCES pharmacy(id)
);

USE getmed_DB;
Select * from customers;
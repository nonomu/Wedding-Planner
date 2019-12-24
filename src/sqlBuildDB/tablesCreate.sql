-- --CREATE DATABASE WeddingPlanner;
USE weddingplanner;
-- DROPPER
-- DROP TABLE booked_attractions,favorites,attractions,invitee,user,weddingDetails;
-- DROP TABLE invitee,tables;

-- CREATE TABLE user(
--     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     email varchar(40),
--     password varchar(40)
-- );
-- CREATE TABLE weddingDetails(
--     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     groom_name varchar(30),
--     bride_name varchar(30),
--     wedding_date DATE,
--     est_invitees varchar(20),
--     est_budget int,
--     est_cash_gifts int,
--     wedding_area varchar(20),
--     music_style varchar(20),
--     user_id int,
--     FOREIGN KEY(user_id) REFERENCES user(id)
-- );
-- ​
-- ​
-- NEW DATA YANIV
-- ​
-- CREATE TABLE attractions(
--     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     category varchar(20),
--     attr_name varchar(20),
--     attr_vendor varchar(20),
--     image text,
--     location varchar(40),
--     rating int,
--     contact_name varchar(20),
--     contact_phone varchar(20),
--     contact_email varchar(40),
--     small_prints text
-- );

-- CREATE TABLE tables(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     table_number INT,
--     num_seats INT
-- );

--  INSERT INTO invitee VALUES(null,"Yaniv",2,700,"gFrien",'050-1111111',"yanicv@gmail.com",null,null);
-- CREATE TABLE invitee(
--     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name varchar(20) NOT NULL,
--     num_invitees int,
--     est_gift int,
--     relation varchar(30),
--     phone varchar(30),
--     email varchar(40),
--     wedding_id int,
--     table_id int,
--     FOREIGN KEY(wedding_id) REFERENCES weddingDetails(id), 
--     FOREIGN KEY(table_id) REFERENCES tables(id)  
-- );

-- CREATE TABLE booked_attractions(
--     user_id int NOT NULL,
--     attraction_id int NOT NULL,
--     price int ,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(attraction_id) REFERENCES attractions(id)
-- );

-- CREATE TABLE favorites(
--     user_id int NOT NULL,
--     attraction_id int NOT NULL,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(attraction_id) REFERENCES attractions(id) 
-- );


-- INSERT INTO user
--  VALUES (NULL,
--  "noammaulmi","123nono");

-- INSERT INTO weddingDetails
--  VALUES (NULL,"Ron Braha",
-- "Shayna",'2019-05-24',70,100000
-- ,120000,"Tel-Aviv","Rock",1);​
 ​
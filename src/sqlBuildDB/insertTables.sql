use weddingplanner;

-- INSERT INTO weddingDetails
--  VALUES (NULL,"Ron Braha",
-- "Shayna",'2019-05-24',70,100000
-- ,120000,"Tel-Aviv","Rock");


-- INSERT INTO user
--  VALUES (NULL,"ronbraha@gmail.com","RNR1",
--  1);


-- INSERT INTO attractions
--  VALUES (
--      NULL,
--      "venue",
--      "Venetion hall",
--      "Yakov",
--      "https://www.godrinkla.com/uploads/venues/2f71ef5a385ad94a63b18b1fbb64063d.jpg",
--      "Tel-Aviv",
--      4.5,
--      "yakov",
--      "072-2133329",
--      "venetion@gmail.com",
--      "hello"     );



-- INSERT INTO booked_attractions
--  VALUES (1,1,200);
-- INSERT INTO favorites
--  VALUES (1,1);

-- INSERT INTO attractions
--  VALUES (
--      NULL,
--      "dj",
--      "Noam mualmi DJ",
--      "nono baam",
--      "https://www.godrinkla.com/uploads/venues/2f71ef5a385ad94a63b18b1fbb64063d.jpg",
--      "Tel-Aviv",
--      5,
--      "Ronit",
--      "054-2222329",
--      "baam@gmail.com",
--      "best dj ever"
--      );

-- INSERT INTO favorites
-- VALUES (1,2);

-- drop table booked_attractions,user,attractions;
--  VALUES (2,4);

SELECT f.* FROM  favorites as f 
             WHERE f.user_id = 2
             AND f.attraction_id =  4;

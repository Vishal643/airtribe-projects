-- P1 - As part of this assignment, we need to list down all the entities, their attributes and the table structures for the scenario mentioned in the previous slide. You also need to write the SQL queries required to create these tables along with few sample entries. Ensure the tables follow 1NF, 2NF, 3NF and BCNF rules.

-- Entities and Attributes 

-- 1. Theatre
--     TheatreID (Primary Key)
--     Name
--     Location

-- 2. MovieID (Primary Key)
--     Title
--     Duration
--     Rating

-- 3. Show
--     ShowID (Primary Key)
--     TheatreID (Foreign Key)
--     MovieID (Foreign Key)
--     ShowDate
--     ShowTime


-- Table Structures

-- 1. Theatre Table
CREATE TABLE Theatre (
    TheatreID INT PRIMARY KEY,
    Name VARCHAR(255),
    Location VARCHAR(255)
);

-- 2. Movie Table
CREATE TABLE Movie (
    MovieID INT PRIMARY KEY,
    Title VARCHAR(255),
    Duration INT,
    Rating FLOAT
);

-- 3. Shows Table
CREATE TABLE Shows (
    ShowID INT PRIMARY KEY,
    TheatreID INT,
    MovieID INT,
    ShowDate DATE,
    ShowTime TIME,
    FOREIGN KEY (TheatreID) REFERENCES Theatre(TheatreID),
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID)
);


-- Sample Data
-- Theatre Table Entries
INSERT INTO Theatre VALUES (1, 'Cineplex 21', 'Koramangala');
INSERT INTO Theatre VALUES (2, 'Movie Magic', 'HSR');

-- Movie Table Entries
INSERT INTO Movie VALUES (1, 'The Great Escape', 120, 4.2);
INSERT INTO Movie VALUES (2, 'Space Odyssey', 150, 3.2);

-- Show Table Entries
INSERT INTO Shows VALUES (1, 1, 1, '2024-03-26', '13:00');
INSERT INTO Shows VALUES (2, 1, 2, '2024-03-26', '16:00');
INSERT INTO Shows VALUES (3, 2, 1, '2024-03-27', '14:00');



-- P2 - Write a query to list down all the shows on a given date at a given theatre along with their respective show timings. 
-- Query to List Shows for a Given Date at a Given Theatre

SELECT m.Title, s.ShowTime, t.Name, t.Location
FROM Shows as s
JOIN Movie as m ON s.MovieID = m.MovieID
JOIN Theatre as t ON s.TheatreID = t.TheatreID
WHERE s.ShowDate = '2024-03-26' AND s.TheatreID = 1
ORDER BY s.ShowTime;

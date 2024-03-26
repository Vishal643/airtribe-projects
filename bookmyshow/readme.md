--BookMyShow Database Structure and Queries--
```This document outlines the database structure for a ticketing platform similar to BookMyShow, focusing on storing information about theatres, movies, and showtimes. It includes the creation of tables according to the principles of normalization (1NF, 2NF, 3NF, and BCNF), sample data for testing, and a query to retrieve showtimes for a specific date and theatre.```

---Database Structure---
Tables and Attributes
1. Theatre
   - TheatreID (INT, Primary Key): Unique identifier for each theatre.
   - Name (VARCHAR(255)): The name of the theatre.
   - Location (VARCHAR(255)): The location of the theatre.

2. Movie
   - MovieID (INT, Primary Key): Unique identifier for each movie.
   - Title (VARCHAR(255)): The title of the movie.
   - Duration (INT): The duration of the movie in minutes.
   - Rating (Float): The rating of the movie.

3. Shows
   - ShowID (INT, Primary Key): Unique identifier for each show.
   - TheatreID (INT, Foreign Key): References TheatreID in the Theatre table.
   - MovieID (INT, Foreign Key): References MovieID in the Movie table.
   - ShowDate (DATE): The date of the show.
   - ShowTime (TIME): The time of the show.

--SQL Creation Scripts--
```
    -- Theatre Table Creation
    CREATE TABLE Theatre (
        TheatreID INT PRIMARY KEY,
        Name VARCHAR(255),
        Location VARCHAR(255)
    );

    -- Movie Table Creation
    CREATE TABLE Movie (
        MovieID INT PRIMARY KEY,
        Title VARCHAR(255),
        Duration INT,
        Rating Float
    );

    -- Show Table Creation
    CREATE TABLE Shows (
        ShowID INT PRIMARY KEY,
        TheatreID INT,
        MovieID INT,
        ShowDate DATE,
        ShowTime TIME,
        FOREIGN KEY (TheatreID) REFERENCES Theatre(TheatreID),
        FOREIGN KEY (MovieID) REFERENCES Movie(MovieID)
    );
```
--Sample Data Entries--
```
    -- Sample Theatre Entries
    INSERT INTO Theatre VALUES (1, 'Cineplex 21', 'Downtown');
    INSERT INTO Theatre VALUES (2, 'Movie Magic', 'Uptown');

    -- Sample Movie Entries
    INSERT INTO Movie VALUES (1, 'The Great Escape', 120, 2.5);
    INSERT INTO Movie VALUES (2, 'Space Odyssey', 150, 3.5);

    -- Sample Show Entries
    INSERT INTO Shows VALUES (1, 1, 1, '2024-03-26', '13:00');
    INSERT INTO Shows VALUES (2, 1, 2, '2024-03-26', '16:00');
    INSERT INTO Shows VALUES (3, 2, 1, '2024-03-27', '14:00');
```

P1: Creation of Tables and Sample Data Insertion
Refer to the SQL Creation Scripts and Sample Data Entries sections above.

P2: Query to List Shows for a Given Date at a Given Theatre
```SELECT 
    t.Name AS TheatreName,
    t.Location,
    m.Title,
    s.ShowTime
FROM 
    Show s
JOIN 
    Movie m ON s.MovieID = m.MovieID
JOIN 
    Theatre t ON s.TheatreID = t.TheatreID
WHERE 
    s.ShowDate = '2024-03-26' 
    AND s.TheatreID = 1
ORDER BY 
    s.ShowTime;```

Expected Output
The above query will output a list of movies and their show times at the specified theatre on the given date, along with the theatre's name and location. The results will be sorted by show time in ascending order.
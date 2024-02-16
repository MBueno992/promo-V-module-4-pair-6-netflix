CREATE DATABASE Netflix;
USE Netflix;

CREATE TABLE movies(
idMovies int auto_increment primary key not null,
title varchar(45) not null,
genre varchar(45) not null,
image varchar(1000) not null,
category varchar(45) not null,
yearMovie int 
);

CREATE TABLE Users(
idUser int auto_increment primary key not null,
user varchar(45) not null,
password varchar(45) not null,
name varchar(45) not null,
email varchar(45) not null,
plan_details varchar(45) not null
);

CREATE TABLE Actors(
idActor int auto_increment primary key not null,
name varchar(45) not null,
lastname varchar(45) not null,
country varchar(45) not null,
birthday date
);
SELECT * FROM MOVIES;
SELECT TITLE, GENRE FROM MOVIES WHERE YEARMOVIE > 1990;
SELECT * FROM MOVIES WHERE CATEGORY LIKE '%10';

UPDATE MOVIES SET YEARMOVIE = 1997 WHERE TITLE LIKE '%vita%';

SELECT * FROM ACTORS;
SELECT * FROM ACTORS WHERE BIRTHDAY BETWEEN '1950-01-01' AND '1960-01-01';
SELECT NAME, LASTNAME FROM ACTORS WHERE COUNTRY LIKE '%UNIDOS';

SELECT * FROM USERS WHERE PLAN_DETAILS LIKE '%STANDARD';
DELETE FROM USERS WHERE USER LIKE 'M%';
SELECT * FROM USERS;

ALTER TABLE ACTORS ADD IMAGE VARCHAR(1000);

CREATE TABLE Pepino (
idPepino int auto_increment primary key,
anacleta varchar(30),
mortificarse varchar(100)
);

DROP TABLE Pepino;

CREATE TABLE movies_has_users (
fk_users int,
fk_movies int,
idMoviesUsers int auto_increment primary key
);

INSERT INTO movies_has_users (fk_users, fk_movies) VALUES (1, 1), (1, 2), (3, 2);

SELECT users.user, movies.title  
FROM users, movies, movies_has_users
WHERE users.idUser = movies_has_users.fk_users AND movies.idMovies = movies_has_users.fk_movies;

ALTER TABLE movies_has_users ADD score int;

SELECT * FROM movies_has_users;

INSERT INTO movies_has_users(score) VALUES (7) WHERE idMovieUsers = 1;

UPDATE movies_has_users SET score = 7 WHERE idMoviesUsers=1;
UPDATE movies_has_users SET score = 10 WHERE idMoviesUsers=2;
UPDATE movies_has_users SET score = 6 WHERE idMoviesUsers=3;

CREATE TABLE movies_has_actors(
fk_idActor int,
fk_idMovie int,
idMoviesActors int auto_increment primary key
);

INSERT INTO movies_has_actors (fk_idMovie, fk_idActor) VALUES (1, 3), (2, 2), (3, 1);

SELECT actors.name, actors.lastname, movies.title
FROM actors, movies, movies_has_actors
WHERE actors.idActor = movies_has_actors.fk_idActor AND movies.idMovies = movies_has_actors.fk_idMovie;

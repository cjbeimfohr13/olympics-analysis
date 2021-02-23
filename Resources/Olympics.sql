-- CREATE TABLES for ETL Project 2
-- Create a sql file of you table schemata
CREATE TABLE athlete (
  id Serial PRIMARY KEY,
  year INT,
  sport VARCHAR(20),
  sex VARCHAR(6),
  nationality VARCHAR(3),
  medal VARCHAR(4),	
  name VARCHAR (50)
);
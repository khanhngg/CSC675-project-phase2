# CSC 675 - Introduction to Database Systems
## Course Project Report - Phase 2
### Team members: Khanh Nguyen, John Lazzarini, Jirat Parkeenvincha, Anita Zhen

# Overview
- Our database describes a very high-level network of relationships between the most outwardly-visible components of an NBA franchise.  Generally speaking, all NBA franchises maintain the same relationships with the same entities that are described in our diagram -- a mascot (or at minimum, a logo), contracted players, and hired coaches who coach the players.  The required data can be accessed from publicly available franchise information maintained by all NBA franchises.  A currently maintained list of players and coaches can be found on franchise websites, and a list of franchise mascots is available at the following link:
https://en.wikipedia.org/wiki/List_of_National_Basketball_Association_mascots


# Setup (in terminal)
1. Make sure to have MySQL installed:

	```
	$ mysql --version
	```

2. Start MySQL:

	```
	$ mysql.server start
	```

3. Run MySQL:

	```
	$ mysql -u root -p
	```

4. Terminal should look like this:

	```
	$ mysql -u root -p
	Enter password:
	Welcome to the MySQL monitor.  Commands end with ; or \g.
	Your MySQL connection id is 4
	Server version: 5.7.20 Homebrew
	
	Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.
	
	Oracle is a registered trademark of Oracle Corporation and/or its
	affiliates. Other names may be trademarks of their respective
	owners.
	
	Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
	
	mysql>
	```

5. To exit: 

	```
	mysql> exit
	```

6. In mysql, create new database called "csc675project" or use existing one:

	```sh
	mysql> CREATE DATABASE csc675project;
	Query OK, 1 row affected (0.02 sec)
	```

7. Use the "csc675project" database:

	```
	mysql> USE csc675project;
	Database changed
	```

8. Next time when you run MySQL again and want to use this database:
	
	```
	$ mysql -u root -p csc675project
	```

# Requirements
### Task 1 - Create Tables, indexes and constraints
- At least 2 indexes (hash-­based or tree­‐based)

### Task 2 - Collect and import data
- You can collect data manually or import data from any available online data repository.

### Task 3 - Write SQL Queries
- At least 2 queries involving GROUP BY, HAVING, and aggregate operators
- At least 2 nested queries involving IN, EXIST, op ANY, op ALL…

### Task 4 - Final Report
- All CREATE TABLE, INDEX, VIEW statements, as well as SELECT queries.
- The snapshot of the results of your SELECT queries. If the results of your select queries are large just include part of the results.


# Queries
## CREATE TABLE + FOREIGN KEY CONSTRAINTS

### 1. Teams

```sql
CREATE TABLE IF NOT EXISTS teams
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  team_name VARCHAR(255) NOT NULL,
  number_of_players INTEGER,
  origin VARCHAR(255),
  year_established INT(4),
  owner VARCHAR(255),
  home_stadium VARCHAR(255),
  PRIMARY KEY (id),
  UNIQUE (id, team_name)
);
```

### 2. Players

```sql
CREATE TABLE IF NOT EXISTS players
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  player_name VARCHAR(255) NOT NULL,
  age INT(2),
  team_name VARCHAR(255),
  jersey_number INT(2),
  position VARCHAR(255),
  years_pro INT(2),
  PRIMARY KEY (id)
);
```

### 3. Coaches

```sql
CREATE TABLE IF NOT EXISTS coaches
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  coach_name VARCHAR(255) NOT NULL,
  age INT(2),
  team_name VARCHAR(255),
  years_in_team INT(2),
  PRIMARY KEY (id)
);
```

### 4. Mascots

```sql
CREATE TABLE IF NOT EXISTS mascots
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  mascot_name VARCHAR(255) NOT NULL,
  team_name VARCHAR(255),
  costume VARCHAR(255),
  PRIMARY KEY (id)
);
```

### 5. Trains

```sql
CREATE TABLE IF NOT EXISTS trains
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  coach_id INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (coach_id) 
    REFERENCES coaches(id),
  FOREIGN KEY (player_id)
    REFERENCES players(id)
);
```

### 6. Represents

```sql
CREATE TABLE IF NOT EXISTS represents
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  mascot_id INTEGER NOT NULL,
  team_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (mascot_id)
    REFERENCES mascots(id),
  FOREIGN KEY (team_id)
    REFERENCES teams(id)
);
```

### 7. Has

```sql
CREATE TABLE IF NOT EXISTS has
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  team_id INTEGER NOT NULL,
  coach_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id)
    REFERENCES teams(id),
  FOREIGN KEY (coach_id)
    REFERENCES coaches(id)
);
```

### 8. Contracts

```sql
CREATE TABLE IF NOT EXISTS contracts
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  team_id INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id)
    REFERENCES teams(id),
  FOREIGN KEY (player_id)
    REFERENCES players(id)
);
```

## CREATE INDEX (BTREE)
### 1. Players

```sql
CREATE INDEX index_name_age
ON players (player_name, age);
```

```sql
CREATE INDEX index_name_jersey
ON players (player_name, jersey_number);
```

### 2. Coaches

```sql
CREATE INDEX index_cname_tname
ON coaches (coach_name, team_name);
```

## INSERT INTO
### 1. Teams

```sql
INSERT INTO teams
  (id, team_name, number_of_players, origin, year_established, owner, home_stadium)
VALUES
  (1,'Golden State Warriors', 16, 'Philadelphia', 1946, 'Joe Lacob', 'Oracle Arena'),
  (2,'Chicago Bulls', 18, 'Chicago', 1966, 'Jerry Reinsdorf','United Center');
```

### 2. Coaches

```sql
INSERT INTO coaches
  (id, coach_name, age, team_name, years_in_team)
VALUES
  (1, 'Steve Kerr', 52, 'Golden State Warriors', 4),
  (2, 'Fred Hoiberg', 45, 'Chicago Bulls', 8);
```

### 3. Mascots

```sql
INSERT INTO mascots
  (id, mascot_name, team_name, costume)
VALUES
  (1, 'Thunder', 'Golden State Warriors', 'Blue Jumpsuit'),
  (2, 'Benny the Bull', 'Chicago Bulls', 'Chicago Bulls Uniform, no. 1');
```

### 4. Players

Abbreviation of positions:
- PG: Point Guard
- SG: Shooting Guard
- SF: Small Forward
- PF: Power Forward
- C: Center

```sql
INSERT INTO players
  (id, player_name, age, team_name, jersey_number, position, years_pro)
VALUES
  (1, 'Klay Thompson', 27, 'Golden State Warriors', 11, 'SG', 8),
  (2, 'Kevin Durant', 29, 'Golden State Warriors', 35, 'PF', 6),
  (3, 'Draymond Green', 27, 'Golden State Warriors', 23, 'PF', 5),
  (4, 'Stephen Curry', 29, 'Golden State Warriors', 30, 'PG', 8),
  (5, 'Andre Iguodala', 34, 'Golden State Warriors', 9, 'SF', 13),
  (6, 'Quinn Cook', 24, 'Golden State Warriors', 4, 'PG', 1),
  (7, 'Nick Young', 32, 'Golden State Warriors', 6, 'SG', 10),
  (8, 'Patrick McCaw', 22, 'Golden State Warriors', 0, 'SG', 1),
  (9, 'Shaun Livingston', 32, 'Golden State Warriors', 34, 'PG', 12),
  (10, 'Jordan Bell', 23, 'Golden State Warriors', 2, 'C', 0),
  (11, 'Zaza Pachulia', 33, 'Golden State Warriors', 27, 'C', 14),
  (12, 'Kevon Looney', 21, 'Golden State Warriors', 5, 'C', 2),
  (13, 'David West', 37, 'Golden State Warriors', 3, 'C', 14),
  (14, 'JaVale McGee', 30, 'Golden State Warriors', 1, 'C', 9),
  (15, 'Damian Jones', 22, 'Golden State Warriors', 15, 'C', 1),
  (16, 'Chris Boucher', 25, 'Golden State Warriors', 25, 'PF', 0),
  (17, 'Ryan Arcidiacono', 24, 'Chicago Bulls', 15, 'PG', 0),
  (18, 'Omer Asik', 31, 'Chicago Bulls', 3, 'C', 7),
  (19, 'Antonio Blakeney', 21, 'Chicago Bulls', 9, 'SG', 0),
  (20, 'Kris Dunn', 24, 'Chicago Bulls', 32, 'PG', 1),
  (21, 'Jarell Eddie', 26, 'Chicago Bulls', 31, 'SG', 2),
  (22, 'Cristiano Felicio', 25, 'Chicago Bulls', 6, 'C', 2),
  (23, 'Jerian Grant', 25, 'Chicago Bulls', 2, 'PG', 2),
  (24, 'Justin Holiday', 29, 'Chicago Bulls', 7, 'SG', 4),
  (25, 'Sean Kilpatrick', 28 , 'Chicago Bulls', 0, 'SG', 3),
  (26, 'Zach LaVine', 23, 'Chicago Bulls', 8, 'PG', 3),
  (27, 'Robin Lopez', 30, 'Chicago Bulls', 42, 'C', 9),
  (28, 'Lauri Markkanen', 20, 'Chicago Bulls', 24, 'PF', 0),
  (29, 'David Nwaba', 25, 'Chicago Bulls', 11, 'SF', 1),
  (30, 'Cameron Payne', 23, 'Chicago Bulls', 22, 'PG', 2),
  (31, 'Bobby Portis', 23, 'Chicago Bulls', 5, 'PF', 2),
  (32, 'Denzel Valentine', 24, 'Chicago Bulls', 45, 'SF', 1),
  (33, 'Noah Vonleh', 22, 'Chicago Bulls', 30, 'PF', 3),
  (34, 'Paul Zipser', 24, 'Chicago Bulls', 16, 'SF', 1);
```

### 5. Trains

```sql
INSERT INTO trains
  (id, coach_id, player_id)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 1, 4),
  (5, 1, 5),
  (6, 1, 6),
  (7, 1, 7),
  (8, 1, 8),
  (9, 1, 9),
  (10, 1, 10),
  (11, 1, 11),
  (12, 1, 12),
  (13, 1, 13),
  (14, 1, 14),
  (15, 1, 15),
  (16, 1, 16),
  (17, 2, 17),
  (18, 2, 18),
  (19, 2, 19),
  (20, 2, 20),
  (21, 2, 21),
  (22, 2, 22),
  (23, 2, 23),
  (24, 2, 24),
  (25, 2, 25),
  (26, 2, 26),
  (27, 2, 27),
  (28, 2, 28),
  (29, 2, 29),
  (30, 2, 30),
  (31, 2, 31),
  (32, 2, 32),
  (33, 2, 33),
  (34, 2, 34);
```

### 6. Represents

```sql
INSERT INTO represents
  (id, mascot_id, team_id)
VALUES
  (1, 1, 1),
  (2, 2, 2);
```

### 7. Has

```sql
INSERT INTO has
  (id, team_id, coach_id)
VALUES
  (1, 1, 1),
  (2, 2, 2);
```

### 8. Contracts

```sql
INSERT INTO contracts
  (id, team_id, player_id)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 1, 4),
  (5, 1, 5),
  (6, 1, 6),
  (7, 1, 7),
  (8, 1, 8),
  (9, 1, 9),
  (10, 1, 10),
  (11, 1, 11),
  (12, 1, 12),
  (13, 1, 13),
  (14, 1, 14),
  (15, 1, 15),
  (16, 1, 16),
  (17, 2, 17),
  (18, 2, 18),
  (19, 2, 19),
  (20, 2, 20),
  (21, 2, 21),
  (22, 2, 22),
  (23, 2, 23),
  (24, 2, 24),
  (25, 2, 25),
  (26, 2, 26),
  (27, 2, 27),
  (28, 2, 28),
  (29, 2, 29),
  (30, 2, 30),
  (31, 2, 31),
  (32, 2, 32),
  (33, 2, 33),
  (34, 2, 34);
```

## CREATE VIEW
### 1.

```sql
CREATE VIEW view_coaches_in_teams AS
  SELECT coach_name, team_name
  FROM coaches
  WHERE coaches.years_in_team > 2;

SELECT * FROM view_coaches_in_teams;
```

![view1](./ss/view1.png)

### 2.

```sql
CREATE VIEW view_players_in_teams AS
  SELECT p.player_name, p.team_name, p.years_pro
  FROM players p 
  WHERE p.years_pro >= 2 AND p.years_pro < 5;

SELECT * FROM view_players_in_teams;
```

![view2](./ss/view2.png)

## SELECT QUERIES

### SELECT ALL
### 1. Teams

```sql
SELECT * FROM teams;
```

![teams](./ss/select_teams.png)

### 2. Players

```sql
SELECT * FROM players;
```

![players](./ss/select_players.png)

### 3. Coaches

```sql
SELECT * FROM coaches;
```

![coaches](./ss/select_coaches.png)

### 4. Mascots
```sql
SELECT * FROM mascots;
```

![mascots](./ss/select_mascots.png)

### GROUP BY, HAVING, aggregate operators
### 1. Find how many players have years of experience greater than 5 in each team

```sql
SELECT p.team_name, p.years_pro, count(*)
FROM players p
GROUP BY p.team_name, p.years_pro
HAVING p.years_pro > 5
ORDER BY p.team_name;
```

![groupby_having](./ss/groupby_having.png)

### 2. Find names of players with age >= 30

```sql
SELECT p.player_name, p.age
FROM players p
HAVING p.age >= 30;
```

![having](./ss/having.png)

### IN, EXIST, op ANY, op ALL (nested queries)
### 1. IN - Find players whose position is PG in Golden State Warriors team

```sql
SELECT *
FROM players p
WHERE p.position = 'PG'
  AND p.team_name IN (SELECT t.team_name
                  FROM teams t
                  WHERE t.team_name = 'Golden State Warriors');
```

![in](./ss/in.png)

### 2. EXISTS - Find the players that are trained by Fred Hoiberg

```sql
SELECT *
FROM players p
WHERE EXISTS (SELECT *
              FROM trains t, coaches c
              WHERE c.coach_name = 'Fred Hoiberg' 
              AND t.player_id = p.id 
              AND t.coach_id = c.id);
```

![exists](./ss/exists.png)

### 3. ANY - Find all players in Chicago Bulls whose age is greater than any players whose age is greater than 25 in team Golden State Warriors

```sql
SELECT *
FROM players p
WHERE p.team_name = 'Chicago Bulls'
  AND p.age > ANY (SELECT p2.age
                      FROM players p2
                      WHERE p2.age > 25 AND p2.team_name = 'Golden State Warriors');
```

![any](./ss/any.png)

### 4. ALL - Find the player and their team name with the highest number of years pro

```sql
SELECT p.player_name, p.team_name, p.years_pro
FROM players p
WHERE p.years_pro >= ALL (SELECT p2.years_pro
                          FROM players p2);
```

![all](./ss/all.png)
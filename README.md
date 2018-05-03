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
````

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
  coach_name VARCHAR(255) NOT NULL,
  player_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (coach_name) 
    REFERENCES coaches(coach_name),
  FOREIGN KEY (player_name)
    REFERENCES players(player_name)
);
```

### 6. Represents

```sql
CREATE TABLE IF NOT EXISTS represents
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  mascot_name VARCHAR(255) NOT NULL,
  team_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (mascot_name)
    REFERENCES mascots(mascot_name),
  FOREIGN KEY (team_name)
    REFERENCES teams(team_name)
);
```

### 7. Has

```sql
CREATE TABLE IF NOT EXISTS has
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  team_name VARCHAR(255) NOT NULL,
  coach_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_name)
    REFERENCES teams(team_name),
  FOREIGN KEY (coach_name)
    REFERENCES coaches(coach_name)
);
```

### 8. Contracts

```sql
CREATE TABLE IF NOT EXISTS contracts
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  team_name VARCHAR(255) NOT NULL,
  player_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_name)
    REFERENCES teams(team_name),
  FOREIGN KEY (player_name)
    REFERENCES players(player_name)
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
ON players (player_name, age);
```

### 2. Coaches

```sql
CREATE INDEX index_cname_tname
ON coaches (coach_name, team_name);
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

### 2.
```sql
CREATE VIEW view_players_in_teams AS
  SELECT player_name, team_name
  FROM players
  WHERE players.years_pro >= 2 AND players.years_pro < 5;

  SELECT * FROM view_players_in_teams;
```

## INSERT INTO
### 1. Teams
```sql
INSERT INTO teams
  (id, team_name, number_of_players, origin, year_established, owner)
VALUES
  (1,'Golden State Warriors', 11, 'idk', 10),
  (2,'Other', 11, 'idk', 10);
```

### 2. // todo -- see above
```sql
INSERT INTO teams
  (id, team_name, number_of_players, origin, year_established, owner)
VALUES
  (1,'Golden State Warriors', 11, 'idk', 10),
  (2,'Other', 11, 'idk', 10);
```
## SELECT QUERIES
### GROUP BY, HAVING, aggregate operators
### 1. //
```sql

```

### 2. //
```sql

```

### IN, EXIST, op ANY, op ALL (nested queries)
### 1. //
```sql

```

### 2. //
```sql

```


# Results / Screenshots
- CREATE TABLE
- INSERT ...
- GROUP BY, HAVING ...
- IN, EXIST, ...
## Task2  
* Create a new database named website.  
    ```sql
    CREATE DATABASE website;   
    SHOW DATABASES;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/0f7d25451a81eea99d6b253645f79be25dce7c9e/week5/task_screenshot/task2/task%202-1.png" />
</p>

* Create a new table named member, in the website database.
    ```sql
    USE website;
    CREATE TABLE member (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        follower_count INT UNSIGNED NOT NULL DEFAULT 0,
        time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    SHOW TABLES;
    DESCRIBE member;  
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/0f7d25451a81eea99d6b253645f79be25dce7c9e/week5/task_screenshot/task2/task2-2.png"/>
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/0f7d25451a81eea99d6b253645f79be25dce7c9e/week5/task_screenshot/task2/task2-2.2.png"/>
</p>

## Task3
* INSERT a new row to the member table where name, username and password must
be set to test. INSERT additional 4 rows with arbitrary data.
    ```sql
    SELECT * FROM member;
    INSERT INTO member (name, username, password)
    VALUES ('test', 'test', 'test');
    
    INSERT INTO member (name, username, password, follower_count)
    VALUES('William', 'william', 'password123', 100);
    
    INSERT INTO member (name, username, password, follower_count)
    VALUES('Smith', 'smith', 'pass123', 125);
    
    INSERT INTO member (name, username, password, follower_count)
    VALUES('Alice', 'alice', 'word88', 200);
    
    INSERT INTO member (name, username, password, follower_count)
    VALUES('Bob', 'bob', 'bob123', 75);
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-1.png"/>
</p>    

*  SELECT all rows from the member table.
    ```sql
    SELECT * FROM member;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-2.png"/>
</p>    

*  SELECT all rows from the member table, in descending order of time.
    ```sql
    SELECT * FROM member ORDER BY time DESC;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-3.png"/>
</p>    

*  SELECT total 3 rows, second to fourth, from the member table, in descending order
of time.  
***Note: it does not mean SELECT rows where id are 2, 3, or 4.***
   ```sql
   SELECT * FROM member ORDER BY time DESC LIMIT 3 OFFSET 1;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-4.png"/>
</p>    

* SELECT rows where username equals to test.
    ```sql
    SELECT * FROM member WHERE username = 'test';
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-5.png"/>
</p>    

* SELECT rows where name includes the es keyword.
    ```sql
    SELECT * FROM member WHERE name LIKE '%es%';
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-6.png"/>
</p>    

* SELECT rows where both username and password equal to test.
    ```sql
    SELECT * FROM member WHERE username = 'test' AND password = 'test';
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-7.png"/>
</p>    

* UPDATE data in name column to test2 where username equals to test.
    ```sql
    UPDATE member SET name = 'test2' WHERE username = 'test';
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task3/task3-8.png"/>
</p>    

## Task4
* SELECT how many rows from the member table.
  ```sql
  SELECT COUNT(*) FROM member;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task4/task4-1.png"/>
</p>    

* SELECT the sum of follower_count of all the rows from the member table.
  ```sql
  SELECT SUM(follower_count) FROM member;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task4/task4-2.png"/>
</p>    

* SELECT the average of follower_count of all the rows from the member table.
  ```sql
  SELECT AVG(follower_count) FROM member;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task4/task4-3.png"/>
</p>    

* SELECT the average of follower_count of the first 2 rows, in descending order of
follower_count, from the member table.
  ```sql
  SELECT AVG(follower_count)FROM (SELECT follower_count FROM member ORDER BY follower_count DESC LIMIT 2) AS subquery;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task4/task4-4.png"/>
</p>    

## Task5
* Create a new table named message, in the website database.
  ```sql
  USE website;
  CREATE TABLE message (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      member_id BIGINT NOT NULL,
      content VARCHAR(255) NOT NULL,
      like_count INT UNSIGNED NOT NULL DEFAULT 0,
      time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (member_id) REFERENCES member(id)
  );
  SHOW TABLES;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task5/task5-1.png"/>
</p>    

* *INSERT some data into message TABLE*  
    ```sql
    SELECT * FROM message;
    INSERT INTO message (member_id, content, like_count)
    VALUES 
        (1, 'This is test', 0),
        (2, 'This is william message', 100),
        (3, 'This is smith message', 120),
        (4, 'This is alice message', 50),
        (5, 'This is bob message', 80);
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task5/task5-1%20insert.png"/>
</p>    
 
* SELECT all messages, including sender names. We have to JOIN the member table
to get that.
    ```sql
    SELECT member.name, message.content FROM member INNER JOIN message ON member.id=message.member_id;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task5/task5-2.png"/>
</p>    

* SELECT all messages, including sender names, where sender username equals to
test. We have to JOIN the member table to filter and get that.
    ```sql
    SELECT member.name, message.content FROM member INNER JOIN message ON member.id=message.member_id
    WHERE member.username='test';
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task5/task5-3.png"/>
</p>    

* Use SELECT, SQL Aggregation Functions with JOIN statement, get the average like
count of messages where sender username equals to test.
    ```sql
    SELECT AVG(message.like_count) FROM member
    INNER JOIN message ON member.id = message.member_id
    WHERE member.username = 'test';
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task5/task5-4.png"/>
</p>    

* Use SELECT, SQL Aggregation Functions with JOIN statement, get the average like
count of messages GROUP BY sender username.
    ```sql
    SELECT member.username, AVG(message.like_count)
    FROM member
    JOIN message ON member.id = message.member_id
    GROUP BY member.username;
<p align="center">
    <img src="https://github.com/WilliamTsai1227/WeHelp_stage1/blob/aeaea5f80e84daee4971828de7f7eb1da3ee2401/week5/task_screenshot/task5/task5-5.png"/>
</p>    



   

      
        
  

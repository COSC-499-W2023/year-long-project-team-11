SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS edusynth;

USE edusynth;

-- Create webuser account for accessing the database from Apache/PHP with limited permissions
-- Note: this is different from the website's 'user' account
CREATE USER IF NOT EXISTS 'webuser' @'localhost' IDENTIFIED BY 'P@ssw0rd';

CREATE USER IF NOT EXISTS 'webuser' @'%' IDENTIFIED BY 'P@ssw0rd';

GRANT
  ALL
  -- CREATE, ALTER, INSERT, UPDATE, DELETE, SELECT
ON edusynth.* 
TO 'webuser' @'localhost';

GRANT
  ALL
  -- CREATE, ALTER, INSERT, UPDATE, DELETE, SELECT
ON edusynth.* 
TO 'webuser' @'%';


FLUSH PRIVILEGES;

-- Create Tables
CREATE TABLE IF NOT EXISTS users (
  userid INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (userid),
  UNIQUE KEY email (email)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

-- CREATE TABLE IF NOT EXISTS saved_content (
--   contentid INT(11) NOT NULL AUTO_INCREMENT,
--   -- who posted it?
--   userid INT(11) NOT NULL,
--   -- content
--   title VARCHAR(255) NOT NULL,
--   contenttype VARCHAR(255) NOT NULL,
--   image BLOB NOT NULL,
--   PRIMARY KEY (contentID),
--   FOREIGN KEY (userID) REFERENCES users (userid)
-- ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

-- ------------------
-- MOCK DATA INSERTS
-- ------------------
-- Mock data inserts for users table
-- INSERT
--   IGNORE INTO users (username, email, password)
-- VALUES
--   ('Ronald McDonald', 'mascot@mcds.com', 'bOrGoR'),
--   ('John Doe', 'johndoe@example.com', 'password123'),
--   ('Jane Doe', 'janedoe@example.com', 'password456');

-- INSERT
--   IGNORE INTO saved_content (userid, title, contenttype, image)
-- VALUES
--   (2, 'Test Content Title', 'text', NULL);
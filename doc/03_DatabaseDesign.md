# DDL

```mysql
-- PC Table
CREATE TABLE PC (
    pc_id     INT PRIMARY KEY,
    CPU       VARCHAR(50),
    GPU       VARCHAR(50),
    ROM       VARCHAR(50),
    Storage   VARCHAR(50),
    RAM       VARCHAR(50)
);

-- Preference Table
CREATE TABLE Preference (
    preference_id   INT PRIMARY KEY,
    dark_mode       BOOLEAN,
    top_10          BOOLEAN,
    recent_released BOOLEAN,
    most_commented  BOOLEAN,
    most_popular    BOOLEAN
);

-- User Table
CREATE TABLE User (
    user_id         INT PRIMARY KEY,
    user_name       VARCHAR(30),
    password        VARCHAR(30),
    preference_id   INT,
    pc_id           INT,
    FOREIGN KEY (preference_id) REFERENCES Preference(preference_id),
    FOREIGN KEY (pc_id) REFERENCES PC(pc_id)
);

-- Game Table
CREATE TABLE Game (
    query_id            INT PRIMARY KEY,
    name                VARCHAR(50),
    platform_Mac        BOOLEAN,
    platform_Windows    BOOLEAN,
    platform_Linux      BOOLEAN,
    released_date       VARCHAR(30),
    price_initial       DECIMAL(5, 2),
    about_text          VARCHAR(1000),
    game_type           BOOLEAN,
    is_free             BOOLEAN,
    pc_id               INT,
    FOREIGN KEY (pc_id) REFERENCES PC(pc_id)
);

-- Review Table
CREATE TABLE Review (
    review_id       INT PRIMARY KEY,
    user_id         INT,
    query_id        INT,
    review_content  VARCHAR(1000),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
);

-- Category Table
CREATE TABLE Category (
    category_id     INT PRIMARY KEY,
    category_name   VARCHAR(30)
);

-- GameOwnedUser Table (many-to-many relationship)
CREATE TABLE GameOwnedUser (
    user_id     INT,
    query_id    INT,
    PRIMARY KEY (user_id, query_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
);

-- UserWishlist Table (many-to-many relationship)
CREATE TABLE UserWishlist (
    user_id     INT,
    query_id    INT,
    PRIMARY KEY (user_id, query_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
);

-- GameCategory Table (many-to-many relationship)
CREATE TABLE GameCategory (
    category_id     INT,
    query_id        INT,
    PRIMARY KEY (category_id, query_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
);

```

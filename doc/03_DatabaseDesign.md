# DDL

```mysql
-- PC Table
CREATE TABLE PC (
    pc_id     INT PRIMARY KEY,
    CPU       VARCHAR(50),
    GPU       VARCHAR(50),
    ROM       INT,
    Storage   INT,
    RAM       INT,
    Score     INT
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
    query_id                   INT PRIMARY KEY,
    ResponseID                 INT,
    QueryName                  TEXT,
    ResponseName               TEXT,
    ReleaseDate                TEXT,
    RequiredAge                INT,
    DemoCount                  TEXT,
    DeveloperCount             TEXT,
    DLCCount                   TEXT,
    Metacritic                 INT,
    MovieCount                 TEXT,
    PackageCount               TEXT,
    RecommendationCount        INT,
    PublisherCount             TEXT,
    ScreenshotCount            TEXT,
    SteamSpyOwners             INT,
    SteamSpyOwnersVariance     INT,
    SteamSpyPlayersEstimate    INT,
    SteamSpyPlayersVariance    INT,
    AchievementCount           INT,
    AchievementHighlightedCount INT,
    ControllerSupport          BOOLEAN,
    IsFree                     BOOLEAN,
    FreeVerAvail               BOOLEAN,
    PurchaseAvail              BOOLEAN,
    SubscriptionAvail          BOOLEAN,
    PlatformWindows            BOOLEAN,
    PlatformLinux              BOOLEAN,
    PlatformMac                BOOLEAN,
    PCReqsHaveMin              BOOLEAN,
    PCReqsHaveRec              BOOLEAN,
    LinuxReqsHaveMin           BOOLEAN,
    LinuxReqsHaveRec           BOOLEAN,
    MacReqsHaveMin             BOOLEAN,
    MacReqsHaveRec             BOOLEAN,
    PriceCurrency              TEXT,
    PriceInitial               FLOAT,
    PriceFinal                 FLOAT,
    SupportEmail               TEXT,
    SupportURL                 TEXT,
    AboutText                  TEXT,
    Background                 TEXT,
    ShortDescrip               TEXT,
    DetailedDescrip            TEXT,
    DRMNotice                  TEXT,
    ExtUserAcctNotice          TEXT,
    HeaderImage                TEXT,
    LegalNotice                TEXT,
    Reviews                    TEXT,
    SupportedLanguages         TEXT,
    Website                    TEXT,
    PCMinReqsText              TEXT,
    PCRecReqsText              TEXT,
    LinuxMinReqsText           TEXT,
    LinuxRecReqsText           TEXT,
    MacMinReqsText             TEXT,
    MacRecReqsText             TEXT,
    -- Foreign Key references
    pc_id                      INT,
    FOREIGN KEY (pc_id) REFERENCES PC(pc_id)
);

-- Review Table
CREATE TABLE Review (
    review_id       INT PRIMARY KEY,
    user_id         INT,
    query_id        INT,
    review_content  VARCHAR(1000),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    ON DELETE CASCADE,
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
    ON DELETE CASCADE
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
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    ON DELETE CASCADE,
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
    ON DELETE CASCADE
);

-- UserWishlist Table (many-to-many relationship)
CREATE TABLE UserWishlist (
    user_id     INT,
    query_id    INT,
    PRIMARY KEY (user_id, query_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    ON DELETE CASCADE,
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
    ON DELETE CASCADE
);

-- GameCategory Table (many-to-many relationship)
CREATE TABLE GameCategory (
    category_id     INT,
    query_id        INT,
    PRIMARY KEY (category_id, query_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
    ON DELETE CASCADE,
    FOREIGN KEY (query_id) REFERENCES Game(query_id)
    ON DELETE CASCADE
);

```

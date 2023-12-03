CREATE DEFINER=`root`@`%` PROCEDURE `RecommendGames`(IN user_id INT)
BEGIN
    -- Declare variables
    DECLARE max_price FLOAT;
    DECLARE platform_preference VARCHAR(30);
    DECLARE finished INTEGER DEFAULT 0;
    DECLARE cur_category_id INT;
    DECLARE cur_category_cursor CURSOR FOR SELECT category_id FROM TempCategoryProportions;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

    -- Determine the maximum price from owned games
    SELECT MAX(PriceFinal) INTO max_price
    FROM Game
    WHERE query_id IN (SELECT query_id FROM GameOwnedUser WHERE user_id = user_id);

    -- Determine the platform preference from owned games
    SELECT PlatformWindows, PlatformLinux, PlatformMac
    INTO platform_preference
    FROM (
        SELECT 'Windows' AS PlatformWindows, COUNT(*) AS CountWindows FROM Game
        WHERE query_id IN (SELECT query_id FROM GameOwnedUser WHERE user_id = user_id) AND PlatformWindows = TRUE
        UNION
        SELECT 'Linux' AS PlatformLinux, COUNT(*) AS CountLinux FROM Game
        WHERE query_id IN (SELECT query_id FROM GameOwnedUser WHERE user_id = user_id) AND PlatformLinux = TRUE
        UNION
        SELECT 'Mac' AS PlatformMac, COUNT(*) AS CountMac FROM Game
        WHERE query_id IN (SELECT query_id FROM GameOwnedUser WHERE user_id = user_id) AND PlatformMac = TRUE
        ORDER BY 2 DESC
        LIMIT 1
    ) AS PlatformPreference;

    -- Create a temporary table to store category proportions
    CREATE TEMPORARY TABLE IF NOT EXISTS TempCategoryProportions (
        category_id INT,
        proportion FLOAT
    );

    -- Calculate the category proportions for the user's owned and wishlist games
    INSERT INTO TempCategoryProportions (category_id, proportion)
    SELECT gc.category_id, COUNT(*) / total.total_count
    FROM GameCategory gc
    JOIN (SELECT query_id FROM GameOwnedUser WHERE user_id = user_id
          UNION
          SELECT query_id FROM UserWishlist WHERE user_id = user_id) AS user_games
    ON gc.query_id = user_games.query_id
    JOIN (SELECT COUNT(*) total_count
          FROM (SELECT query_id FROM GameOwnedUser WHERE user_id = user_id
                UNION
                SELECT query_id FROM UserWishlist WHERE user_id = user_id) AS total_games) AS total
    GROUP BY gc.category_id
    ORDER BY proportion DESC
    LIMIT 3; -- Select only the top three categories

    -- Create a temporary table to store the recommended games
    CREATE TEMPORARY TABLE IF NOT EXISTS TempRecommendations (
        query_id INT
    );

    -- Open the cursor
    OPEN cur_category_cursor;

    category_loop: LOOP
        FETCH cur_category_cursor INTO cur_category_id;
        IF finished = 1 THEN 
            LEAVE category_loop;
        END IF;

        -- Insert games into the temporary table based on the current category
        INSERT INTO TempRecommendations (query_id)
        SELECT g.query_id
        FROM Game g
        JOIN GameCategory gc ON g.query_id = gc.query_id AND gc.category_id = cur_category_id
        WHERE (g.PlatformWindows = (platform_preference = 'Windows') OR
               g.PlatformLinux = (platform_preference = 'Linux') OR
               g.PlatformMac = (platform_preference = 'Mac'))
        AND g.PriceFinal <= max_price
        AND g.Metacritic >= 75
        ORDER BY g.RecommendationCount DESC, g.SteamSpyPlayersEstimate DESC
        LIMIT 10; -- Limit per category for balance

    END LOOP;

    CLOSE cur_category_cursor;

    -- Retrieve and return the recommended games
    SELECT DISTINCT g.*
    FROM Game g
    WHERE g.query_id IN (SELECT query_id FROM TempRecommendations)
    ORDER BY g.Metacritic DESC, g.RecommendationCount DESC, g.SteamSpyPlayersEstimate DESC;

    -- Drop the temporary tables
    DROP TEMPORARY TABLE IF EXISTS TempCategoryProportions;
    DROP TEMPORARY TABLE IF EXISTS TempRecommendations;
END
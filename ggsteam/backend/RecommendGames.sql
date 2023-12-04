CREATE DEFINER=`root`@`%` PROCEDURE `RecommendGames`(IN uid INT)
BEGIN
    -- Declare variables
    DECLARE max_price FLOAT;
    DECLARE finished INTEGER DEFAULT 0;
    DECLARE cur_category_id INT;
    DECLARE cur_category_cursor CURSOR FOR SELECT category_id FROM TempCategoryProportions;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

    -- Determine the maximum price from owned games
    SELECT MAX(PriceFinal) INTO max_price
    FROM Game
    WHERE query_id IN (SELECT query_id FROM GameOwnedUser WHERE user_id = uid);
    
    -- Create a temporary table to store category proportions
    CREATE TEMPORARY TABLE IF NOT EXISTS TempCategoryProportions (
        category_id INT,
        proportion FLOAT
    );

    -- Calculate the category proportions for the user's owned and wishlist games
    INSERT INTO TempCategoryProportions (category_id, proportion)
    SELECT gc.category_id, COUNT(*) as proportion
    FROM GameCategory gc
    JOIN (SELECT query_id FROM GameOwnedUser WHERE user_id = uid
          UNION
          SELECT query_id FROM UserWishlist WHERE user_id = uid) AS user_games
    ON gc.query_id = user_games.query_id
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
        WHERE g.PriceFinal <= max_price
        AND g.Metacritic >= 75
        AND g.query_id not in 
				(SELECT query_id FROM GameOwnedUser WHERE user_id = uid
                UNION
                SELECT query_id FROM UserWishlist WHERE user_id = uid)
        ORDER BY g.RecommendationCount DESC, g.SteamSpyPlayersEstimate DESC
        LIMIT 5; -- Limit per category for balance

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
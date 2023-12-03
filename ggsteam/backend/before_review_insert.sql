CREATE DEFINER=`root`@`%` TRIGGER `before_review_insert` BEFORE INSERT ON `Review` FOR EACH ROW BEGIN
    DECLARE user_game_exists INT;

    -- Check if the user_id and query_id combination exists in GameOwnedUser table
    SELECT COUNT(*)
    INTO user_game_exists
    FROM GameOwnedUser
    WHERE user_id = NEW.user_id AND query_id = NEW.query_id;

    -- If the combination exists, insert the review with a random review_id
    IF user_game_exists > 0 THEN
        SET NEW.review_id = FLOOR(RAND() * 1000000);  -- Adjust the range as per your requirement
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot insert review: user does not own this game.';
    END IF;
END
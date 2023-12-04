const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const cors = require("cors")
const bcrypt = require("bcrypt")

const app = express()

const pool = mysql.createPool({
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  host: "34.67.168.253",
  // port: "3306",
  user: "root",
  password: "team007",
  database: "ggsteam",
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", async (req, res) => {
  res.send("Hello World!")
})

app.get("/api/games", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

app.get("/api/games/:id", async (req, res) => {
  const query = "SELECT * FROM Game WHERE query_id = ?"
  pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//most poplarn(/api/most-popluar?categoryid=none&age=none&pricelow=none&pricehigh=none&pcscore=none)
app.get("/api/most-popular", async (req, res) => {
  var query = "SELECT Game.query_id, Game.QueryName, Game.HeaderImage"
  var from = " FROM Game"
  var where = " "
  if (req.query.categoryid != "none"){
    from = from + " NATURAL JOIN GameCategory"
    where = where + " category_id="+req.query.categoryid
  }
  if (req.query.age != "none"){
    if(where != " "){
      where = where + " AND RequiredAge<="+req.query.age
    }
    else{
      where = where + " RequiredAge<="+req.query.age
    }
  }
  if (req.query.pricelow != "none" && req.query.pricehigh != "none"){
    if(where != " "){
      where = where + " AND "+req.query.pricelow +"<= PriceFinal <="+req.query.pricehigh
    }
    else{
      where = where +" "+ req.query.pricelow +"<= PriceFinal <="+req.query.pricehigh
    }
  }
  if (req.query.pcscore != "none"){
    from = from + " JOIN PC"
    if(where != " "){
      where = where + " AND Game.pc_id=PC.pc_id AND PC.Score <="+req.query.pcscore
    }
    else{
      where = where + " Game.pc_id=PC.pc_id AND PC.Score <="+req.query.pcscore
    }
  }
  if(where==" "){
    query = query+from+" ORDER BY RecommendationCount DESC LIMIT 1000"
  }
  else{
    query = query+from+" WHERE"+where+" ORDER BY RecommendationCount DESC LIMIT 1000"
  }
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//most poplar top 10
app.get("/api/most-popular/most-viewd1", async (req, res) => {
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game ORDER BY RecommendationCount DESC LIMIT 10"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//most played
app.get("/api/most2", async (req, res) => {
  var query = "SELECT Game.query_id, Game.QueryName, Game.HeaderImage"
  var from = " FROM Game"
  var where = " "
  if (req.query.categoryid != "none"){
    from = from + " NATURAL JOIN GameCategory"
    where = where + " category_id="+req.query.categoryid
  }
  if (req.query.age != "none"){
    if(where != " "){
      where = where + " AND RequiredAge<="+req.query.age
    }
    else{
      where = where + " RequiredAge<="+req.query.age
    }
  }
  if (req.query.pricelow != "none" && req.query.pricehigh != "none"){
    if(where != " "){
      where = where + " AND "+req.query.pricelow +"<= PriceFinal <="+req.query.pricehigh
    }
    else{
      where = where +" "+ req.query.pricelow +"<= PriceFinal <="+req.query.pricehigh
    }
  }
  if (req.query.pcscore != "none"){
    from = from + " JOIN PC"
    if(where != " "){
      where = where + " AND Game.pc_id=PC.pc_id AND PC.Score <="+req.query.pcscore
    }
    else{
      where = where + " Game.pc_id=PC.pc_id AND PC.Score <="+req.query.pcscore
    }
  }
  if(where==" "){
    query = query+from+" ORDER BY SteamSpyOwners DESC LIMIT 1000"
  }
  else{
    query = query+from+" WHERE"+where+" ORDER BY SteamSpyOwners DESC LIMIT 1000"
  }
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//most played top 10
app.get("/api/most2/most-viewd2", async (req, res) => {
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game ORDER BY SteamSpyOwners DESC LIMIT 10"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//best deal of single player
app.get("/api/most3", async (req, res) => {
  var from = " FROM (SELECT * FROM Game g1 WHERE g1. PriceInitial > 0 and g1.query_id IN (SELECT gc.query_id FROM Category c NATURAL JOIN GameCategory gc WHERE c.category_name = 'CategorySinglePlayer')) finalgame"
  var query = "SELECT finalgame.query_id, finalgame.QueryName, finalgame.HeaderImage"
  var where = " "
  if (req.query.categoryid != "none"){
    from = from + " NATURAL JOIN GameCategory"
    where = where + " category_id="+req.query.categoryid
  }
  if (req.query.age != "none"){
    if(where != " "){
      where = where + " AND RequiredAge<="+req.query.age
    }
    else{
      where = where + " RequiredAge<="+req.query.age
    }
  }
  if (req.query.pricelow != "none" && req.query.pricehigh != "none"){
    if(where != " "){
      where = where + " AND "+req.query.pricelow +"<= PriceFinal <="+req.query.pricehigh
    }
    else{
      where = where +" "+ req.query.pricelow +"<= PriceFinal <="+req.query.pricehigh
    }
  }
  if (req.query.pcscore != "none"){
    from = from + " JOIN PC"
    if(where != " "){
      where = where + " AND finalgame.pc_id=PC.pc_id AND PC.Score <="+req.query.pcscore
    }
    else{
      where = where + " finalgame.pc_id=PC.pc_id AND PC.Score <="+req.query.pcscore
    }
  }
  if(where==" "){
    query = query+from+" ORDER BY (finalgame.PriceFinal / finalgame.PriceInitial) ASC LIMIT 1000"
  }
  else{
    query = query+from+" WHERE"+where+" ORDER BY (finalgame.PriceFinal / finalgame.PriceInitial) ASC LIMIT 1000"
  }
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//best deal of single player top 10
app.get("/api/most3/most-viewd3", async (req, res) => {
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game g1 WHERE g1. PriceInitial > 0 and g1.query_id IN (SELECT gc.query_id FROM Category c NATURAL JOIN GameCategory gc WHERE c.category_name = 'CategorySinglePlayer') ORDER BY (g1.PriceFinal / g1.PriceInitial) ASC LIMIT 10;"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//popular free game
app.get("/api/most4", async (req, res) => {
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game WHERE IsFree=1 ORDER BY RecommendationCount DESC LIMIT 1000"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//popular free game player top 10
app.get("/api/most4/most-viewd4", async (req, res) => {
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game WHERE IsFree=1 ORDER BY RecommendationCount DESC LIMIT 10"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//Most Owned Paid Games with High Score
app.get("/api/most5", async (req, res) => {
  const query =
    "SELECT g.query_id, g.QueryName, g.HeaderImage FROM Game g LEFT JOIN (SELECT o.query_id, count(o.user_id) as num_player FROM GameOwnedUser o Group by o.query_id) o1 ON g.query_id = o1.query_id WHERE g.Metacritic > 70 and IsFree = False ORDER BY o1.num_player LIMIT 1000;"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//Most Owned Paid Games with High Score top 10
app.get("/api/most5/most-viewd5", async (req, res) => {
  const query =
    "SELECT g.query_id, g.QueryName, g.HeaderImage FROM Game g LEFT JOIN (SELECT o.query_id, count(o.user_id) as num_player FROM GameOwnedUser o Group by o.query_id) o1 ON g.query_id = o1.query_id WHERE g.Metacritic > 70 and IsFree = False ORDER BY o1.num_player LIMIT 10;"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//most reviewd games
app.get("/api/most6", async (req, res) => {
  const query =
    "SELECT g2.query_id, g2.QueryName, g2.HeaderImage FROM Game g2 JOIN (SELECT g.query_id, COUNT(r.review_id) as countr FROM Game g NATURAL JOIN Review r GROUP BY g.query_id) g1 USING(query_id) ORDER BY countr DESC;"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//most reviewed games top 10
app.get("/api/most6/most-viewd6", async (req, res) => {
  const query =
    "SELECT g2.query_id, g2.QueryName, g2.HeaderImage FROM Game g2 JOIN (SELECT g.query_id, COUNT(r.review_id) as countr FROM Game g NATURAL JOIN Review r GROUP BY g.query_id) g1 USING(query_id) ORDER BY countr DESC LIMIT 10"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//search
app.get("/api/search", async (req, res) => {
  const searchTerm = "%" + req.query.searchTerm + "%" // Add '%' for wildcard matching
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game WHERE QueryName LIKE ?"
  // console.log("++++++++++++++++" + searchTerm)
  pool.query(query, [searchTerm], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }

    res.json(results)
  })
})

app.get("/api/login", async (req, res) => {
  const username = req.query.username
  const password = req.query.password // This should be a hashed password
  const query = "SELECT user_id, password FROM User WHERE user_name = ?"

  pool.query(query, [username], async (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }

    if (results.length === 1) {
      // Compare hashed password here (use bcrypt or similar library)
      const isMatch = await bcrypt.compare(password, results[0].password)
      if (isMatch) {
        res.json({ message: "Login successful", user: results[0] })
      } else {
        res.status(401).send("Login failed")
      }
    } else {
      res.status(401).send("Login failed")
    }
  })
})

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send("Username and password are required")
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the new user into the database
    const query = "INSERT INTO User (user_name, password) VALUES (?, ?)"
    pool.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database query error:", err)
        return res.status(500).send("Error registering new user")
      }
      res.status(201).send("User registered successfully")
    })
  } catch (err) {
    console.error(err)
    res.status(500).send("Server error")
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log("running on port " + PORT)
})


//get user wishlist
app.get("/api/wishlist/:id", async (req, res) => {
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game NATURAL JOIN UserWishlist WHERE user_id = ?"
  pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    console.log(results)
    res.json(results)
  })
})

//add game to user wishlist /api/wishlist/addgame?user_id=1&query_id=2
app.post("/api/wishlist/addgame", async (req, res) => {
  const query = "INSERT INTO UserWishlist (user_id, query_id) VALUES(?,?)"
  pool.query(query, [req.body.userid, req.body.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.status(200).send("Game added")
  })
})

//delete game from user wishlist /api/wishlist/removegame?user_id=1&query_id=2
app.delete("/api/wishlist/removegame/:userid/:id", async (req, res) => {
  const query = "DELETE FROM UserWishlist WHERE user_id = ? AND query_id = ?"
  pool.query(query, [req.params.userid, req.params.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.status(200).send("Game deleted")
  })
})

//get user ownedlist
app.get("/api/ownedlist/:id", async (req, res) => {
  const query =
    "SELECT query_id, QueryName, HeaderImage FROM Game NATURAL JOIN GameOwnedUser WHERE user_id = ?"
  pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//add game to user ownedlist /api/ownedlist/addgame?user_id=1&query_id=2
app.post("/api/ownedlist/addgame", async (req, res) => {
  const query = "INSERT INTO GameOwnedUser (user_id, query_id) VALUES(?,?)"
  pool.query(query, [req.body.userid, req.body.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.status(200).send("Game added")
  })
})

//delete game from user ownedlist /api/ownedlist/removegame?user_id=1&query_id=2
app.delete("/api/ownedlist/removegame/:userid/:id", async (req, res) => {
  const query = "DELETE FROM GameOwnedUser WHERE user_id= ? AND query_id= ?"
  pool.query(query, [req.params.userid, req.params.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.status(200).send("Game deleted")
  })
})

//get category
app.get("/api/category", async (req, res) => {
  const query = "SELECT * FROM Category;"
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

//add comment (req.body with user_id, query_id, review_content)
app.post("/api/comment/addcomment", async (req, res) => {
  const { user_id, query_id, review_content } = req.body
  if (!user_id || !query_id || !review_content) {
    return res.status(401).send("comment information are required")
  }
  try {
    // Insert the new comment into the database
    const query =
      "INSERT INTO Review(user_id, query_id, review_content) VALUES(?, ?, ?)"
    pool.query(query, [user_id, query_id, review_content], (err, result) => {
      if (err) {
        console.error("Database query error:", err)
        return res.status(500).send("Error: failed to add new comment")
      }
      res.status(200).send("Comment added")
    })
  } catch (err) {
    console.error(err)
    res.status(500).send("Server error")
  }
})

//delete comment /api/comment/removecomment?user_id=1&query_id=2
app.get("/api/comment/removecomment", async (req, res) => {
  const query = "DELETE FROM Review WHERE user_id=? AND query_id=?;"
  pool.query(
    query,
    [req.query.user_id, req.query.query_id],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error)
        res.status(500).send("Database error")
        return
      }
      res.status(200).send("Review deleted")
    }
  )
})

//delete comment by review_id /api/comment/removecomment/:id
app.get("/api/comment/removecomment/:id", async (req, res) => {
  const query = "DELETE FROM Review WHERE review_id=?;"
  pool.query(
    query,
    [req.query.user_id, req.query.query_id],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error)
        res.status(500).send("Database error")
        return
      }
      res.status(200).send("Review deleted")
    }
  )
})

//update query (req.body with user_id, query_id, review_content)
app.post("/api/comment/updatecomment", async (req, res) => {
  const { review_id, review_content } = req.body
  if (!review_id || !review_content) {
    return res.status(401).send("comment information are required")
  }
  try {
    // Insert the new comment into the database
    const query = "UPDATE Review SET review_content=? WHERE review_id=?;"
    pool.query(query, [review_content, review_id], (err, result) => {
      if (err) {
        console.error("Database query error:", err)
        return res.status(500).send("Error: failed to update comment")
      }
      res.status(200).send("Comment updated")
    })
  } catch (err) {
    console.error(err)
    res.status(500).send("Server error")
  }
})

//get comment by gameid
app.get("/api/comment/:id", async (req, res) => {
  const query = "SELECT * FROM Review WHERE query_id = ?"
  pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
      return
    }
    res.json(results)
  })
})

app.get("/api/recommend/:id", async (req, res) => {
  const query = "CALL RecommendGames(?);"
  pool.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error("Database query error:", error)
      res.status(500).send("Database error")
    }
    res.json(results)
  })
})

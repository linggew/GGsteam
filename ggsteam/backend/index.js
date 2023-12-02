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
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game LIMIT 5"
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

//most poplar
app.get("/api/most-popular", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game ORDER BY RecommendationCount DESC LIMIT 1000"
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
app.get("/api/games/most-viewd1", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game ORDER BY RecommendationCount DESC LIMIT 10"
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
app.get("/api/games/most2", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game ORDER BY SteamSpyOwners DESC LIMIT 1000"
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
app.get("/api/games/most-viewd2", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game ORDER BY SteamSpyOwners DESC LIMIT 10"
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
app.get("/api/games/most3", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game g1 WHERE g1. PriceInitial > 0 and g1.query_id IN (SELECT gc.query_id FROM Category c NATURAL JOIN GameCategory gc WHERE c.category_name = 'CategorySinglePlayer') ORDER BY (g1.PriceFinal / g1.PriceInitial) ASC LIMIT 1000;"
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
app.get("/api/games/most-viewd3", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game g1 WHERE g1. PriceInitial > 0 and g1.query_id IN (SELECT gc.query_id FROM Category c NATURAL JOIN GameCategory gc WHERE c.category_name = 'CategorySinglePlayer') ORDER BY (g1.PriceFinal / g1.PriceInitial) ASC LIMIT 10;"
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
app.get("/api/games/most4", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game WHERE IsFree=1 ORDER BY RecommendationCount DESC LIMIT 1000"
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
app.get("/api/games/most-viewd4", async (req, res) => {
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game WHERE IsFree=1 ORDER BY RecommendationCount DESC LIMIT 10"
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
app.get("/api/games/most5", async (req, res) => {
  const query = "SELECT g.query_id, g.QueryName, g.HeaderImage FROM Game g LEFT JOIN (SELECT o.query_id, count(o.user_id) as num_player FROM GameOwnedUser o Group by o.query_id) o1 ON g.query_id = o1.query_id WHERE g.Metacritic > 70 and IsFree = False ORDER BY o1.num_player LIMIT 1000;"
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
app.get("/api/games/most-viewd5", async (req, res) => {
  const query = "SELECT g.query_id, g.QueryName, g.HeaderImage FROM Game g LEFT JOIN (SELECT o.query_id, count(o.user_id) as num_player FROM GameOwnedUser o Group by o.query_id) o1 ON g.query_id = o1.query_id WHERE g.Metacritic > 70 and IsFree = False ORDER BY o1.num_player LIMIT 10;"
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
app.get("/api/games/most6", async (req, res) => {
  const query = "SELECT g2.query_id, g2.QueryName, g2.HeaderImage FROM Game g2 JOIN (SELECT g.query_id, COUNT(r.review_id) as countr FROM Game g NATURAL JOIN Review r GROUP BY g.query_id) g1 USING(query_id) ORDER BY countr DESC;"
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
app.get("/api/games/most-viewd6", async (req, res) => {
  const query = "SELECT g2.query_id, g2.QueryName, g2.HeaderImage FROM Game g2 JOIN (SELECT g.query_id, COUNT(r.review_id) as countr FROM Game g NATURAL JOIN Review r GROUP BY g.query_id) g1 USING(query_id) ORDER BY countr DESC LIMIT 10"
  pool.query(query, (error, results) => {
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

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send('Username and password are required')
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the new user into the database
    const query = 'INSERT INTO User (user_name, password) VALUES (?, ?)'
    pool.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Database query error:', err)
        return res.status(500).send('Error registering new user')
      }
      res.status(201).send('User registered successfully')
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log("running on port " + PORT)
})

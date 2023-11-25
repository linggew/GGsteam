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
  const query = "SELECT query_id, QueryName, HeaderImage FROM Game LIMIT 10"
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

app.get("/api/login", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password; // This should be a hashed password
  const query = "SELECT user_id, password FROM User WHERE user_name = ?";

  pool.query(query, [username], async (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      res.status(500).send("Database error");
      return;
    }

    if (results.length === 1) {
      // Compare hashed password here (use bcrypt or similar library)
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        res.json({ message: "Login successful", user: results[0] });
      } else {
        res.status(401).send("Login failed");
      }
    } else {
      res.status(401).send("Login failed");
    }
  });
});

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const query = 'INSERT INTO User (user_name, password) VALUES (?, ?)';
    pool.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Error registering new user');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("running on port " + PORT);
})

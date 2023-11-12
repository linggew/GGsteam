const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const pool = mysql.createPool({
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  host: "34.67.168.253",
  port: "3306",
  user: "root",
  password: "team007",
  database: "ggsteam",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/games", async (req, res) => {
  const query = "SELECT * FROM Game LIMIT 10";
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      res.status(500).send("Database error");
      return;
    }
    res.json(results);
  });
});

app.listen(3002, () => {
  console.log("running on port 3002");
});

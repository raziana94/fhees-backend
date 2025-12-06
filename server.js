const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection (Azure)
const db = mysql.createConnection({
  host: "fhees-mysql-prod.mysql.database.azure.com",
  user: "fheesadmin",
  password: "Fhees2024!Secure",
  database: "appdb",
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
  } else {
    console.log("MySQL Connected Successfully to Azure!");
  }
});

// ROUTE UTAMA - TEST SERVER
app.get("/", (req, res) => {
  res.send("API is running on Azure and connected to MySQL!");
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Query MySQL
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, rows) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (rows.length > 0) {
      return res.json({
        message: "Login success",
        token: "dummy-token-123"
      });
    }

    res.status(401).json({ message: "Invalid credentials" });
  });
});

// PORT Azure
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("API running on port " + port);
});

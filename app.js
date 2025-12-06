const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROUTE UTAMA - TEST SERVER
app.get("/", (req, res) => {
  res.send("API is running on Azure!");
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // contoh login simple
  if (username === "admin" && password === "1234") {
    return res.json({
      message: "Login success",
      token: "dummy-token-123"
    });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// PORT Azure
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("API running on port " + port);
});

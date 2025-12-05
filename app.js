const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// LOGIN API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        return res.json({ token: "dummy-token-abc123" });
    }

    return res.status(401).json({ message: "Invalid credentials" });
});

// START SERVER
app.listen(3000, () => {
    console.log("API running on port 3000");
});

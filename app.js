require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const trackRoutes = require("./Routes/trackRoutes");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("./Controller/authController");

// Serve static files from public folder but disable auto-indexing
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// Middleware
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/api/tracks", trackRoutes);

// Default route: serve the login page (signin.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html"));
});

// Protected route for the main page (index.html)
app.get("/index.html", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;

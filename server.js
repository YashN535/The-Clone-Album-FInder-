require("dotenv").config();
const http = require("http");
const PORT = process.env.PORT || 4000;
const connectDB = require("./Config/db");
const app = require("./app");

// Connect to MongoDB

connectDB();

// Create the HTTP server

const server = http.createServer(app);

// Start Server

server.listen(PORT, () => console.log(`💬 Server running on port ${PORT}`));

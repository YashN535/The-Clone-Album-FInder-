const express = require("express");
const router = express.Router();
const trackController = require("../Controller/trackController");

// Define the search route

router.get("/search", trackController.searchTracks);

module.exports = router;

const spotifyService = require("../Service/spotifyService");

exports.searchTracks = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Missing search query" });
    }
    const result = await spotifyService.searchTracks(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Error in searchTracks:",
      error.response ? error.response.data : error.message
    );

    // Return the error details  for debugging

    res.status(400).json({
      error: error.response ? error.response.data : error.message,
    });
  }
};

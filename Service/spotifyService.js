const axios = require("axios");
const qs = require("qs");
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} = require("../Config/spotify.config");

let accessToken = null;
let tokenExpiry = null; // Timestamp when token expires

exports.getAccessToken = async () => {
  // Return token if it's still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
        },
      }
    );

    accessToken = tokenResponse.data.access_token;
    // Set expiry time based on the expires_in value (in seconds)
    tokenExpiry = Date.now() + tokenResponse.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error(
      "Error fetching Spotify access token:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

exports.searchTracks = async (query) => {
  const token = await exports.getAccessToken();
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: "track", limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Spotify API error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

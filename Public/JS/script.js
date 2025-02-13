document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements

  const signupBtn = document.getElementById("signupBtn");
  const signinBtn = document.getElementById("signinBtn");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const resultsSection = document.getElementById("results");

  // Redirect to Sign Up page when the Sign Up button is clicked
  if (signupBtn) {
    signupBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "signup.html";
    });
  }

  // Redirect to Sign In page when the Sign In button is clicked
  if (signinBtn) {
    signinBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "signin.html";
    });
  }

  // Handle search form submission
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) {
        alert("Please enter a search term.");
        return;
      }

      // Clear previous results and show a loading message
      resultsSection.innerHTML = "";
      const loadingDiv = document.createElement("div");
      loadingDiv.className = "col-12 text-center loading";
      loadingDiv.innerHTML = "<p>Loading...</p>";
      resultsSection.appendChild(loadingDiv);

      // Fetch search results from your API endpoint
      fetch(`/api/tracks/search?query=${encodeURIComponent(query)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Clear the loading indicator
          resultsSection.innerHTML = "";

          // Check if data contains track items
          if (
            !data.tracks ||
            !data.tracks.items ||
            data.tracks.items.length === 0
          ) {
            resultsSection.innerHTML =
              '<div class="col-12"><p>No results found.</p></div>';
            return;
          }

          // Iterate over track items and display each as a card
          data.tracks.items.forEach((track) => {
            const colDiv = document.createElement("div");
            colDiv.className = "col-md-4 mb-4";

            const cardDiv = document.createElement("div");
            cardDiv.className = "card h-100";

            // Album image (fallback to a placeholder if unavailable)
            const img = document.createElement("img");
            img.className = "card-img-top";
            if (
              track.album &&
              track.album.images &&
              track.album.images.length > 0
            ) {
              // Use the smallest image available
              img.src = track.album.images[track.album.images.length - 1].url;
            } else {
              img.src = "images/placeholder.jpg";
            }
            cardDiv.appendChild(img);

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            // Track title
            const trackName = document.createElement("h5");
            trackName.className = "card-title";
            trackName.textContent = track.name;
            cardBody.appendChild(trackName);

            // Artist names
            const artistNames = document.createElement("p");
            artistNames.className = "card-text";
            if (track.artists && track.artists.length > 0) {
              artistNames.textContent = track.artists
                .map((artist) => artist.name)
                .join(", ");
            }
            cardBody.appendChild(artistNames);

            // Open album link
            const albumLink = document.createElement("a");
            albumLink.textContent = "Open Album";
            albumLink.href = track.album.external_urls.spotify;
            albumLink.target = "_blank";
            albumLink.className = "btn btn-secondary btn-sm";
            cardBody.appendChild(albumLink);

            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);
            resultsSection.appendChild(colDiv);
          });
        })
        .catch((error) => {
          resultsSection.innerHTML = `<div class="col-12"><p>Error: ${error.message}</p></div>`;
          console.error("Error fetching search results:", error);
        });
    });
  }
});

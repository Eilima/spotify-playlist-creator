const clientId = "92a316052efe4b0e92fa29bc654e308f"; // Insert client ID(Spotify APIs) here.
const redirectUri = "http://localhost:3000/"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  // Will return accessToken if it exist already or get a new one
  getAccessToken() {
    // Checks if access token exist
    if (accessToken) {
      return accessToken;
    }

    // Looks in the window url to find accessToken
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    // Looks in the window url to find expires in token
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    // Checks if both exist in url
    if (accessTokenMatch && expiresInMatch) {
      // Stores accessToken from whats found in the url
      accessToken = accessTokenMatch[1];
      // Converts url expiresIn token to number and stores it
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      // Sets window url equal to accessUrl
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;
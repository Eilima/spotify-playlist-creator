const clientId = "92a316052efe4b0e92fa29bc654e308f"; // Insert client ID(Spotify APIs) here.
const redirectUri = "https://reverent-khorana-e8a09e.netlify.app"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
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

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const jsonResponse = await response.json();
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
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const jsonResponse = await response.json();
    userId = jsonResponse.id;
    const response_1 = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: name }),
      }
    );
    const jsonResponse_1 = await response_1.json();
    const playlistId = jsonResponse_1.id;
    return fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      }
    );
  },
};

export default Spotify;

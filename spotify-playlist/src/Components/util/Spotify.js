//Add spotify API id
const clientId = "";
const redirectUri = "http://localhost:3000/";
let accessToken = "";

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;
    else {
      const accessTokenMatch = window.location.href.match(
        /access_token=([^&]*)/
      );
      const expiresinMatch = window.location.href.match(/expires_in=([^&]*)/);
    }
    if (accessTokenMatch && expiresinMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresinMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${accessToken}&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
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
          artist: track.artist[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;

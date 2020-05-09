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
};

export default Spotify;

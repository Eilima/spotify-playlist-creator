import Spotify from "spotify-web-api-js";

const clientId = "92a316052efe4b0e92fa29bc654e308f"; // Insert client ID(Spotify APIs) here.
const redirectUri = "http://localhost:3000/"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

export const S = new Spotify();

const getAccessToken = () => {
  // Checks if access token exist
  if (accessToken) {
    return accessToken;
  }

  // Looks in the window url to find accessToken using regex
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  // Looks in the window url to find expires in token using regex
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
};

export const createPlaylist = async (playlistName, playlistTracks) => {
  let response = await S.getMe();
  const user_id = response.id;
  await S.createPlaylist(user_id, { name: playlistName });
  const playlists = await S.getUserPlaylists(user_id);
  const playlist = playlists.items.find(
    (playlist) => playlist.name === playlistName
  );
  console.log(playlist.id);
  const playlist_id = playlist.id;
  const trackUris = playlistTracks.map((track) => track.uri);
  S.addTracksToPlaylist(playlist_id, trackUris);
};

S.setAccessToken(getAccessToken());

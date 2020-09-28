import React, { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

import { S, createPlaylist } from "../../util/Spotify";

import "./App.css";

const App = () => {
  // Create statefull component and variables
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Function that will attempt to add the arguement, a track, that was passed to the function to playlistTracks's state
  const addTrack = (track) => {
    // Declares variable to the same value as the current playlistTracks state
    let tracks = playlistTracks;
    // Loops every element, track, in the playlistTracks array to determine if the arguement's ID matches an ID in the array
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      // If true, exit the function returning nothing. We exit because the track passed is already present in the playlistTracks array.
      return;
    } else {
      // If false, the arguemnent's ID did not match any ID in the playlistTracks array.
      // Push arguement, a track, to the tracks array, variable that holds playlistTracks values.
      // Set the new playlistTracks state with variable that holds old and new tracks.
      tracks.push(track);
      setPlaylistTracks([...tracks]);
    }
  };

  // Function that will attempt to remove the arguement, a track, from playlistTrack's state.
  const removeTrack = (track) => {
    // Declares variable to the same value as the current playlistTracks state
    let tracks = playlistTracks;
    // Loops trough array, declared above, to filter elements in order to remove arguement from the array, playlistTracks, and redeclares with array returned.
    // if element, track, ID doesn't match with arguement ID it will be part of the array that will be returned.
    // If element ID does match with arguement ID, that element will not be part of the returned array.
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    // Sets playlistTracks as tracks array.
    setPlaylistTracks(tracks);
  };

  // Function that will set playlistName state to the arguement passed.
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Function that will create a playlist to the user Spotify account with the tracks added and name created.
  const savePlaylist = () => {
    // Calls function saved in Spotify.js that will create playlist
    createPlaylist(playlistName, playlistTracks);
    // Resets playlistTracks and playlistName
    setPlaylistTracks([]);
    setPlaylistName("New Playlist");
  };

  // Function that will perform search by calling Spotify's API with the arguement passed as the search term.
  const search = async (searchTerm) => {
    // Calls the search function from the Spotify file, passing the arguments for the search term and what information we want returned.
    const results = await S.search(searchTerm, ["track"]);
    // Sets the searchResults as the items of the object returned
    setSearchResults(results.tracks.items);
  };

  return (
    <div>
      <h1>Spotify Playlist Creator</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults results={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};
export default App;

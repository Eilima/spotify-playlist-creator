import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../util/Spotify";
// import { TrackList } from "../TrackList/TrackList";

class App extends React.Component {
  state = {
    searchResults: [
      {
        name: "name1",
        artist: "artist1",
        album: "album1",
        id: 1,
      },
      {
        name: "name2",
        artist: "artist2",
        album: "album2",
        id: 2,
      },
    ],
    playlistName: "Test",
    playlistTracks: [
      {
        name: "name3",
        artist: "artist3",
        album: "album3",
        id: 3,
      },
    ],
  };

  addTrack = (track) => {
    let tracks = this.state.playlistTracks;
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
    // if (
    //   !this.state.playlistTracks.find(
    //     (savedTrack) => savedTrack.id === track.id
    //   )
    // ) {
    //   this.setState({
    //     playlistTracks: track,
    //   });
    // }
  };
  removeTrack = (track) => {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({
      playlistTracks: tracks,
    });
  };

  updatePlaylistName = (name) => {
    this.setState({
      playlistName: name,
    });
  };

  savePlaylist = () => {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
  };

  search = (searchTerm) => {
    Spotify.search(searchTerm).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  };

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;

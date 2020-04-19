import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { TrackList } from "../TrackList/TrackList";

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

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;

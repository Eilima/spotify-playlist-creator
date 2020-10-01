import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export const Playlist = ({
  onNameChange,
  playlistTracks,
  playlistName,
  onRemove,
  onSave,
}) => {
  // A handler function that will change the value of the App component's state, playlistName, when the user interacts with the input field.
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };
  return (
    <div className="Playlist">
      <input placeholder={"New Playlist"} onChange={handleNameChange} />
      <TrackList
        results={playlistTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

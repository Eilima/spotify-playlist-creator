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

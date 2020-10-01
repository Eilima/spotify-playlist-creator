import React from "react";
import "./Track.css";

export const Track = ({ track, key, onRemove, onAdd, isRemoval }) => {
  // Function that return either a '-' or '+' depending if the conditions are met.
  const renderAction = () => {
    // Depending of value of isRemoval for track. True means that the track is on the Playlist vice versa.
    if (isRemoval) {
      // Return a button with a onevent handler to the remove track from the playlist.
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    } else {
      return (
        // Return a button with a to remove the track from the playlist.
        <button className="Track-action" onClick={addTrack}>
          +
        </button>
      );
    }
  };

  // Handler that will call a function passed through props and pass arguement, track.
  const addTrack = () => {
    // Calls function from App component, that adds a track to the playlistTracks state in the App component.
    onAdd(track);
  };

  // Handler that will call a function passed through props and pass arguement, track.
  const removeTrack = () => {
    // Calls function from App component, that removes a track from the playlistTracks state in the App component.
    onRemove(track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artists[0].name} | {track.album.name}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

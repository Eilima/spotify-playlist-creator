import React from "react";
import "./Track.css";

export const Track = ({ track, key, onRemove, onAdd, isRemoval }) => {
  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={addTrack}>
          +
        </button>
      );
    }
  };

  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
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

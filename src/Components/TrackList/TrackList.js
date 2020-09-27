import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export const TrackList = ({ results, onRemove, isRemoval, onAdd }) => {
  return (
    <div className="TrackList">
      {results
        ? results.map((track) => {
            return (
              <Track
                track={track}
                key={track.id}
                onAdd={onAdd}
                onRemove={onRemove}
                isRemoval={isRemoval}
              />
            );
          })
        : null}
    </div>
  );
};

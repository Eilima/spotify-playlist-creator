import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export const TrackList = ({ results, onRemove, isRemoval, onAdd }) => {
  return (
    <div className="TrackList">
      {/* Uses a ternary operator to determine wether to display Track component */}
      {
        // if results !== null or results === null
        results
          ? // if true, results !== null, map through array returning a Track component for each element in the array
            results.map((track) => {
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
          : // else, results === null, return null (display nothing).
            null
      }
    </div>
  );
};

import React from "react";
import "./SearchResults.css";
import { TrackList } from "../TrackList/TrackList.js";

export const SearchResults = ({ results, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList results={results} onAdd={onAdd} isRemoval={false} />
    </div>
  );
};

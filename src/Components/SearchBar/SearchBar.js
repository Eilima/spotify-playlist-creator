import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ onSearch }) => {
  // sets the components state
  const [term, setTerm] = useState("");
  // Passes the compnents state to app.js
  const search = (e) => {
    onSearch(term);
    e.preventDefault();
  };
  // accepts the event from the onClick button attribute
  const handleTermChange = (event) => {
    // Obtain the value from the event and sets the state
    setTerm(event.target.value);
  };

  // ToDo
  // Make form for when user presses enter it will submit for search
  return (
    <div className="SearchBar">
      <form>
        <input
          placeholder={"Enter A Song, Album, or Artist"}
          onChange={handleTermChange}
        />
        <button className="SearchButton" onClick={search}>
          SEARCH
        </button>
      </form>
    </div>
  );
};

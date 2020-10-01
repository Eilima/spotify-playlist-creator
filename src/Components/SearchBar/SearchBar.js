import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ onSearch }) => {
  // Sets the functional component state
  const [searchTerm, setSearchTerm] = useState("");

  // Will call function and pass arguement.
  const search = (e) => {
    // Calls the search functio in the App component.
    onSearch(searchTerm);
    // Prevents a refresh of the page
    e.preventDefault();
  };
  // Function that will change the components state, term, when the user interacts with input field
  const handleTermChange = (event) => {
    // Obtains the value from the event passed and sets the state
    setSearchTerm(event.target.value);
  };

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

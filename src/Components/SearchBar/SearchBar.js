import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  // sets the components state
  state = {
    term: "",
  };
  // Passes the compnents state to app.js
  search = (e) => {
    this.props.onSearch(this.state.term, e);
  };
  // accepts the event from the onClick button attribute
  handleTermChange = (event) => {
    // Obtain the value from the event and sets the state
    this.setState({
      term: event.target.value,
    });
  };

  render() {
    // ToDo
    // Make form for when user presses enter it will submit for search
    return (
      <div className="SearchBar">
        <form>
          <input
            placeholder="Enter A Song, Album, or Artist"
            onChange={this.handleTermChange}
          />
          <br />
          <button className="SearchButton" onClick={this.search}>
            SEARCH
          </button>
        </form>
      </div>
    );
  }
}

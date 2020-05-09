import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  state = {
    term: null,
  };
  search = () => {
    this.props.onSearch(this.state.term);
  };
  handleTermChange = (event) => {
    this.setState({
      term: event.target.value,
    });
  };
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

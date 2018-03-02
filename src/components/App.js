import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import RatInfo from "./RatInfo";

class App extends Component {
  state = {
    selectedRat: null
  };

  onRatClick = rat => {
    this.setState({ selectedRat: rat });
  };

  render() {
    const { selectedRat } = this.state;
    console.log("selected: ", selectedRat);
    return (
      <div className="app">
        <div className="app-title">Rats!</div>
        <h3>
          <i> All the latest rat sightings </i>
        </h3>
        <div id="map-container">
          <Map onRatClick={this.onRatClick} />
        </div>
        <div id="rat-info">
          {selectedRat ? RatInfo(selectedRat) : <strong> Choose a rat </strong>}
        </div>
      </div>
    );
  }
}

export default App;

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
      <div className="App">
        <h1 className="App-title">Rats!</h1>
        <h3> <i> All the latest rat sightings </i> </h3>
        <div id="MapContainer">
          <Map onRatClick={this.onRatClick} />
        </div>
        <div id="RatInfo">
          {selectedRat ? RatInfo(selectedRat) : <strong> Choose a rat </strong>}
        </div>
      </div>
    );
  }
}

export default App;

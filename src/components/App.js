import React, { Component } from "react";
import axios from "axios";
import "../styles/App.css";
import Map from "./Map";
import RatInfo from "./RatInfo";

class App extends Component {
  state = {
    selectedRat: null,
    rats: [],
    fetchingError: false
  };

  onRatClick = rat => {
    this.setState({ selectedRat: rat });
  };

  componentDidMount() {
    axios
      .get(
        "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?" +
          "&$where=descriptor='Rat Sighting'&$limit=200&$order=created_date DESC"
      )
      .then(res => {
        //console.log("got response: ", res);

        this.setState({
          rats: res.data.filter(rat => rat.location && rat.location.coordinates)
        });
      })
      .catch(err => {
        console.log("error fetching: ", err);
        this.setState({
          fetchingError: true
        });
      });
  }

  render() {
    const { rats, selectedRat, fetchingError } = this.state;
    return (
      <div className="app">
        <div className="app-title">Rats!</div>
        <h3>
          <i> All the latest rat sightings in NYC </i>
        </h3>
        <div id="map-container">
          {fetchingError ? (
            <h3> Error fetching rats </h3>
          ) : (
            <Map
              rats={rats}
              onRatClick={this.onRatClick}
              selectedRat={selectedRat}
            />
          )}
        </div>
        <div id="rat-info">
          {selectedRat ? (
            <RatInfo rat={selectedRat} />
          ) : (
            <strong> Choose a rat </strong>
          )}
        </div>
      </div>
    );
  }
}

export default App;

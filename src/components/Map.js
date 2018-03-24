import React from "react";
import GoogleMapReact from "google-map-react";
import ratImageXS from "../rat_images/rat_xs.png";
import ratImageS from "../rat_images/rat_s.png";
import ratImageM from "../rat_images/rat_m.png";
import RatMarker from "./RatMarker";

const defaultOptions = {
  defaultCenter: { lat: 40.7128, lng: -73.9 },
  defaultZoom: 12
};

class Map extends React.Component {
  state = {
    mapOptions: {}
  };

  onMapChange = options => {
    this.setState({
      mapOptions: options
    });
  };

  onRatClick = rat => {
    console.log("clicked on: ", rat);
    const { selectedRat } = this.props;
    
    if (!selectedRat || selectedRat.unique_key !== rat.unique_key) {
      this.props.onRatClick(rat);
    } else {
      this.props.onRatClick(null);
    }
  };

  render() {
    const { rats, selectedRat } = this.props;
    const { mapOptions } = this.state;
    const { zoom } = mapOptions;

    console.log(rats);
    const image = zoom >= 16 ? ratImageM : zoom >= 14 ? ratImageS : ratImageXS;

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCAHyClSI14MU4M4S30xHugTYoj_3viEX0&v=3.31"
        }}
        options={this.createMapOptions}
        onChange={this.onMapChange}
        {...defaultOptions}
        {...mapOptions}
      >
        {rats.map(rat => (
          <RatMarker
            rat={rat}
            image={image}
            selected={selectedRat && selectedRat.unique_key === rat.unique_key}
            onRatClick={this.onRatClick}
            key={rat.unique_key}
            lat={rat.location.coordinates[1]}
            lng={rat.location.coordinates[0]}
          />
        ))}
      </GoogleMapReact>
    );
  }
}

export default Map;

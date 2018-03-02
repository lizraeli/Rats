import React from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
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
    mapOptions: defaultOptions,
    rats: [],
    selectedRatId: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    // Since this component does not depend on props, we only rerender when state changes
    // So we avoid unneeded renders when parent (App) component rerenders
    return this.state !== nextState;
  }

  componentDidMount() {
    // Get the 200 latest rat sightings
    axios
      .get(
        "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$$app_token=YFMHCkkJQzF7LJWzQx0jGFFiT" +
          "&$where=descriptor='Rat Sighting'&$limit=200&$order=created_date DESC"
      )
      .then(res => {
        this.setState({
          rats: res.data.filter(rat => rat.location && rat.location.coordinates)
        });
      })
      .catch(err => {
        console.log("error fetching rats");
      });
  }

  onMapChange = options => {
    this.setState({
      mapOptions: options
    });
  };

  onRatClick = rat => {
    this.props.onRatClick(rat);
    this.setState({ selectedRatId: rat.unique_key });
  };

  render() {
    const { rats, mapOptions, selectedRatId } = this.state;
    const { zoom } = mapOptions;

    const image = zoom >= 16 ? ratImageM : zoom >= 14 ? ratImageS : ratImageXS;

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCAHyClSI14MU4M4S30xHugTYoj_3viEX0"
        }}
        onChange={this.onMapChange}
        {...defaultOptions}
        {...mapOptions}
      >
        {rats.map(rat => (
          <RatMarker
            rat={rat}
            image={image}
            selected={rat.unique_key === selectedRatId}
            onRatClick={() => this.onRatClick(rat)}
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

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
    rats: []
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
      });
  }

  onMapChange = options => {
    this.setState({
      mapOptions: options
    });
  };
  render() {
    const { rats, mapOptions } = this.state;
    const { defaultCenter, defaultZoom } = defaultOptions;

    const { zoom } = mapOptions;
    const image = zoom >= 16 ? ratImageM : zoom >= 14 ? ratImageS : ratImageXS;

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCm5JPCHnaom__2KMMfZez3eG2r8DeTIXE"
        }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onChange={this.onMapChange}
        {...mapOptions}
      >
        {rats.map(rat => (
          <RatMarker
            key={rat.unique_key}
            rat={rat}
            image={image}
            lat={rat.location.coordinates[1]}
            lng={rat.location.coordinates[0]}
            onRatClick={this.props.onRatClick}
          />
        ))}
      </GoogleMapReact>
    );
  }
}

export default Map;

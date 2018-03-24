import React from "react";
import PropTypes from "prop-types";
import "../styles/RatMarker.css";

const RatMarker = ({ rat, image, onRatClick, selected }) => (
  <img
    className={selected ? "rat selected" : "rat"}
    alt=""
    src={image}
    onClick={() => onRatClick(rat)}
  />
);

RatMarker.propTypes = {
  rat: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  onRatClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default RatMarker;

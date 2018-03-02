import React from "react";
import "./RatMarker.css";

const RatMarker = ({ rat, image, onRatClick }) => (
  <img className="rat" alt="" src={image} onClick={() => onRatClick(rat)} />
);

export default RatMarker;

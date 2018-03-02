import React from "react";
import "./RatMarker.css";

const RatMarker = ({ rat, image, onRatClick, selected }) => (
  <img
    className={selected ? "rat selected" : "rat"}
    alt=""
    src={image}
    onClick={() => onRatClick(rat)}
  />
);

export default RatMarker;

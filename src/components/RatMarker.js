import React from "react";

import "./RatMarker.css";

/**
 * Info about a rat sighting
 * @typedef {Object} Rat
*/

/**
 * @function RatMarker
 * @param  {Object} rat
 * @param  {string} image
 * @param  {Function} onRatClick
 * @param  {boolean} selected 
 * @return {JSX.Element} 
 */
const RatMarker = ({ rat, image, onRatClick, selected }) => (
  <img
    className={selected ? "rat selected" : "rat"}
    alt=""
    src={image}
    onClick={() => onRatClick(rat)}
  />
);

export default RatMarker;

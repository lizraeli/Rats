import React from "react";
import PropTypes from "prop-types";
import { formatCreatedDate } from "../utils/utils";

const RatInfo = ({ rat }) => {
  const { created_date } = rat;
  // string representing date & time should be formatted as yyyy-mm-ddThh:mm:ss
  const formattedDate = created_date ? formatCreatedDate(created_date) : "-";

  return (
    <div>
      <div id="date">Spotted on: {formattedDate}</div>
      <div> Location type: {rat.location_type} </div>
      <div> Address: {rat.incident_address} </div>
    </div>
  );
};

RatInfo.propTypes = {
  rat: PropTypes.shape({
    createdDate: PropTypes.string,
    location_type: PropTypes.string,
    incident_address: PropTypes.string
  }).isRequired
};

export default RatInfo;

import React from "react";

const formatDate = date => {
  const dateArr = date.split("-");
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  return `${month}/${day}/${year}`;
};

const RatInfo = rat => {
  const date = rat.created_date ? rat.created_date.split("T")[0] : "-";
  const formattedDate = formatDate(date);

  return (
    <div>
      Spotted on: {formattedDate} <br />
      Location type: {rat.location_type} <br />
      Address: {rat.incident_address}
    </div>
  );
};

export default RatInfo;

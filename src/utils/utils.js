import moment from "moment";

/**
 * @function formatDate
 * @param  {string} createdDate: string representing a date & time formatted as yyyy-mm-ddThh:mm:ss
 * @return {string} string formatted as MM/DD/YYYY
 */
export const formatCreatedDate = createdDate => {
  const date = moment(createdDate, "YYYY-MM-DD");
  return date.isValid() ? date.format("MM/DD/YYYY") : "-";
};

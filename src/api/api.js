import axios from "axios";

export const getRatSightings = () =>
  axios.get(
    "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?" +
      "&$where=descriptor='Rat Sighting'&$limit=200&$order=created_date DESC"
  );

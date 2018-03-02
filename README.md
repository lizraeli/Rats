# Rats

This app uses the following NYC OpenData API: [311 Service Requests from 2010 to PresentSocial Services](https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9).

The following url is used to get the latest 200 rat sightings:

```text
https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$where=descriptor='Rat Sighting'&$limit=200&$order=created_date DESC
```

## Libraries

* React
* [Axios](https://github.com/axios/axios)
* [google-map-react](https://github.com/istarkov/google-map-react)

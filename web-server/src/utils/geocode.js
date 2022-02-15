const request = require('postman-request');

const geocode = (address, callback) => {
  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2x5c3N5IiwiYSI6ImNremFtcGs1ZjFlYXAydnBxZHVjbWg0bjAifQ.8ma4VUkAwtcWvo6ZO1PpKQ&limit=1`;

  request({ url: mapUrl, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to location services.', undefined);
    } else if (body.features[0].center.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      //? Destructuring body.features[0] to assign variables.
      const {
        center: [longitude, latitude],
        place_name,
      } = body.features[0];
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: place_name,
      });
    }
  });
};

module.exports = geocode;

const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2589c31caebedd1bbadc84f2643b2ddb&query=${longitude},${latitude}&units=f`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service.');
    } else if (body.error) {
      callback('Unable to find location.');
    } else {
      //? Destructuring the body.current object and setting variables
      const {
        temperature,
        weather_descriptions: [condition],
        feelslike,
        wind_speed: windSpeed,
        wind_dir: windDir,
      } = body.current;

      callback(
        undefined,
        `It is currently ${condition.toLowerCase()}. The temperature is ${temperature}° with winds from the ${windDir} at ${windSpeed} mph. It feels like ${feelslike}°.`
      );
    }
  });
};

module.exports = forecast;

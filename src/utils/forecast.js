// REQUEST MODULE
const request = require("request");

// API
const weatherKey = process.env.WEATHER_API_KEY;

// WEATHER STACK
const weatherStack = (latitude, longitude, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${
    (latitude, longitude)
  }`;

  request({ url: weatherUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions} with a ${body.current.precip}% chance of rain. It is currently ${body.current.temperature}°C out. It feels like ${body.current.feelslike}°C`
      );
    }
  });
};

module.exports = weatherStack;

const weatherModule = require("../modules/Weather"); // weather api handler
let weather; // variable to store weather
let time;

async function getWeather() {
  weather = await weatherModule(); // gets weather
  time = new Date();
}

getWeather(); // runs function to get weather at the first time this module is required

// Get Weather
exports.get_weather = async (req, res) => {
  if (new Date() - time > 3600000) {
    await getWeather(); // gets new weather if it has been 1+ hour since update
  }
  res.status(200).json(weather); // returns weather data, formatted
};

const weatherModule = require('../modules/Weather'); // weather api handler
let weather; // variable to store weather

async function getWeather() {
    weather = await weatherModule; // gets weather
}

getWeather(); // runs function to get weather

// Get Weather
exports.get_weather = async (req, res) => {
    res.status(200).json(weather); // returns weather data, formatted
}
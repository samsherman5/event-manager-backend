const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// gets the day of the week (monday, tuesday, wednesday) from a string formatted (MM-DD-YYYY)
async function getDayOfWeek(dateString) {
  const [year, month, day] = dateString.split('-');
  const formattedDateString = `${month}/${day}/${year}`;
  const dateObject = new Date(formattedDateString);
  const options = { weekday: 'long' };
  const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(dateObject);
  return dayOfWeek;
}

// gets the weather from the api
async function getWeather() {
  const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=10577&days=3&aqi=no&alerts=no`);
  return await res.data;
}

// capitilizes the first letter of each word
async function capitilizeWords(str) {
  return new Promise(resolve => {
    const words = str.split(' ');

    const capitalizedWords = words.map(word => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return `${firstLetter}${restOfWord}`;
    });

    const capitalizedStr = capitalizedWords.join(' ');

    resolve(capitalizedStr);
  });
}

// weather handler, returns the data for the client
async function handleWeather() {
  const weather = await getWeather();

  const todayData = weather.forecast.forecastday[0];
  const tomorrowData = weather.forecast.forecastday[1];
  const overmorrowData = weather.forecast.forecastday[2];

  const day1 = await getDayOfWeek(todayData.date);
  const day2 = await getDayOfWeek(tomorrowData.date);
  const day3 = await getDayOfWeek(overmorrowData.date);

  const desc1 = await capitilizeWords(todayData.day.condition.text);
  const desc2 = await capitilizeWords(tomorrowData.day.condition.text);
  const desc3 = await capitilizeWords(overmorrowData.day.condition.text);

  return {
    today: {
      high: todayData.day.maxtemp_f,
      low: todayData.day.mintemp_f,
      desc: desc1,
      image: "https://"+(todayData.day.condition.icon).substring(2),
      day: day1
    },
    tomorrow: {
      high: tomorrowData.day.maxtemp_f,
      low: tomorrowData.day.mintemp_f,
      desc: desc2,
      image: "https://"+(tomorrowData.day.condition.icon).substring(2),
      day: day2
    },
    overmorrow: {
      high: overmorrowData.day.maxtemp_f,
      low: overmorrowData.day.mintemp_f,
      desc: desc3,
      image: "https://"+(overmorrowData.day.condition.icon).substring(2),
      day: day3
    }
  };
}


module.exports = handleWeather;
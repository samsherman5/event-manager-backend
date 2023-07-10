// Imports
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

// Controllers
const eventController = require('./controllers/eventController');
const accountController = require('./controllers/accountController');

const app = express();

/*
  Middleware
*/

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

/*
  Route Handlers
*/

// Accounts
app.post('/login', accountController.login); // Login
app.all('/*', accountController.check_cookie); // Middleware Cookie Authentication
app.post('/create_account', accountController.create_account);

// Weather
app.get('/weather', (req, res) => {
    res.json(weather);
});

// Events
app.get('/events', eventController.get_events);
app.post('/events', eventController.create_event);
app.post('/remove_event', eventController.remove_event);
app.post('/edit_event', eventController.edit_event);
app.post('/clear_events', eventController.clear_events);


// 404
app.all('/*', (req, res) => {
  res.sendStatus(404);
});

module.exports = app;

/*
  Load Modules
*/

// Weather
const handleWeather = require('./modules/Weather');
var weather;

async function run() {
  weather = await handleWeather();
}

if (!weather) {
  run();
}

// Database
const database = require('./modules/Database');
database.connect();
 
app.listen(3000, () => {
  console.log("Listening");
});
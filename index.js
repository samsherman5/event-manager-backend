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
app.post('/api/login', accountController.login); // Login
app.all('/api/*', accountController.check_cookie); // Middleware Cookie Authentication
app.post('/api/create_account', accountController.create_account);

// Weather
app.get('/api/weather', (req, res) => {
    res.json(weather);
});

// Events
app.get('/api/events', eventController.get_events);
app.post('/api/events', eventController.create_event);
app.post('/api/remove_event', eventController.remove_event);
app.post('/api/edit_event', eventController.edit_event);
app.post('/api/clear_events', eventController.clear_events);


// 404
app.all('/api/*', (req, res) => {
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
 
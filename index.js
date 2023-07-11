// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

// Controllers
const eventController = require('./controllers/eventController');
const accountController = require('./controllers/accountController');
const weatherController = require('./controllers/weatherController');

// Production vs Development Settings
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = {
  credentials: true, 
  origin: isProduction ? "https://st-events.vercel.app" : "http://localhost:3000"
};

// App
const app = express();

/*
  Middleware
*/

app.use(cors(allowedOrigins)); // allows cross-origin-requests, letting frontend access this
app.use(express.urlencoded({ extended: false })); // parses body (p1)
app.use(express.json()); // parses body (p2)
app.use(cookieParser()); // parses cookies
app.use(mongoSanitize()); // sanitizes for nosql/mongodb injection attemps

/*
  Route Handlers
*/

// Accounts 
app.post('/login', accountController.login); // login
app.all('/*', accountController.check_cookie); // middleware - cookie authentication
app.post('/create_account', accountController.create_account); // create account

// Weather
app.get('/weather', weatherController.get_weather); // weather data

/*
  Events
*/

app.get('/events', eventController.get_events); // returns event list
// Header: day (Monday, Tuesday, Wednesday)
app.post('/events', eventController.create_event); // create event
// Body: title (string), day (string), organizer (array), time (string) 
app.post('/remove_event', eventController.remove_event); // removes an event
// Body: _id (string)
app.post('/edit_event', eventController.edit_event); // edit event takes 
// Body: title (string), day (string), organizer (array), time (string), and _id (string)
app.post('/clear_events', eventController.clear_events); // clear all events
// no parameters


/*
  404
*/
app.all('/*', (req, res) => {
  res.sendStatus(404); // sends status 404: not found after everything above is attempted
});

/*
  Load Modules
*/

// Weather
// const handleWeather = require('./modules/Weather');
// var weather;

// async function run() {
//   weather = await handleWeather();
// }

// run();

// Database
const database = require('./modules/Database');
database.connect();
 
/*
  Listen
*/
app.listen(8080, () => {
  console.log("Listening");
});
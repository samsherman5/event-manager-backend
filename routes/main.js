/*
    Imports
*/
const express = require('express');
const router = express.Router();

/*
    Controllers
*/
const eventController = require('../controllers/eventController');
const accountController = require('../controllers/accountController');
const weatherController = require('../controllers/weatherController');

/*
    Accounts Handlers
*/
router.post('/login', accountController.login); // login
router.use(accountController.check_cookie); // middleware - cookie authentication
router.post('/create_account', accountController.create_account); // create account

/*
    Weather Handler
*/
router.get('/weather', weatherController.get_weather); // weather data

/*
    Events Handlers
*/
router.get('/events', eventController.get_events); // returns event list
// Header: day (Monday, Tuesday, Wednesday)
router.post('/events', eventController.create_event); // create event
// Body: title (string), day (string), organizer (array), time (string) 
router.post('/remove_event', eventController.remove_event); // removes an event
// Body: _id (string)
router.post('/edit_event', eventController.edit_event); // edit event takes 
// Body: title (string), day (string), organizer (array), time (string), and _id (string)
router.post('/clear_events', eventController.clear_events); // clear all events
// no parameters

module.exports = router;
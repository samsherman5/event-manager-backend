/*
    Imports
*/
const express = require("express");
const router = express.Router();

/*
    Controllers
*/
const eventController = require("../controllers/eventController");
const accountController = require("../controllers/accountController");
const weatherController = require("../controllers/weatherController");

/*
    Accounts Handlers
*/
router.get("/status", (req, res) => {
  res.sendStatus(200);
});

router.get("/weather", weatherController.get_weather); // weather data
router.get("/viewer_events", eventController.get_events); // returns event list

router.post("/login", accountController.login); // login

router.use(accountController.check_cookie); // middleware - cookie authentication
router.post("/create_account", accountController.create_account); // create account

/*
    Events Handlers
*/
// Header: day (Monday, Tuesday, Wednesday)
router.get("/events", eventController.get_events); // returns event list
router.post("/create_event", eventController.create_event); // create event
// Body: title (string), day (string), organizer (array), time (string)
router.delete("/remove_event", eventController.remove_event); // removes an event
// Body: _id (string)
router.put("/edit_event", eventController.edit_event); // edit event takes
// Body: title (string), day (string), organizer (array), time (string), and _id (string)
router.delete("/clear_events", eventController.clear_events); // clear all events
// no params
router.post("/import_json", eventController.import_json); // import json as event list
// Body: events (stringified json)
router.get("/export_json", eventController.export_json); // export json event list
// no params

router.all("*", (req, res) => {
  res.sendStatus(404); // sends status 404: not found after everything above is attempted
});

module.exports = router;

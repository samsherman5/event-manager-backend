// Imports
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// Modules / Middleware
const database = require("./modules/Database");
const allowVercelRequests = require("./middleware/allowVercelRequests");
const dynamicCors = require("./middleware/dynamicCors");

/*
  Middleware Settings
*/

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 256, // Maximum 124 requests per minute
});

/*
  Middleware
*/

const app = express();
// app.use(limiter); // Rate limiting
app.use(dynamicCors);
app.use(allowVercelRequests);
app.use(express.urlencoded({ extended: false })); // parses body (p1)
app.use(express.json()); // parses body (p2)
app.use(cookieParser()); // parses cookies
app.use(mongoSanitize()); // sanitizes for nosql/mongodb injection attemps

/*
  Route Handlers
*/

const mainRoutes = require("./routes/main");
app.use("/", mainRoutes); // main routes

// Database
database.connect();

/*
  Listen
*/
app.listen(8080, () => {
  console.log("Listening");
});

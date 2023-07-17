// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");

// Modules / Variables
const database = require('./modules/Database');

/*
  Middleware Settings
*/
const allowedOrigins = {
  credentials: true, 
  origin: process.env.FRONTEND_ADDRESS
  // origin: isProduction ? "https://st-events.vercel.app" : "http://localhost:3000"
};

// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 124, // Maximum 124 requests per minute
// });

/*
  Start of App
*/
const app = express();

/*
  Middleware
*/

// Rate-Limiting
// app.use(limiter);
app.use(cors(allowedOrigins)); // allows cross-origin-requests, letting frontend access this
app.use(express.urlencoded({ extended: false })); // parses body (p1)
app.use(express.json()); // parses body (p2)
app.use(cookieParser()); // parses cookies
app.use(mongoSanitize()); // sanitizes for nosql/mongodb injection attemps

/*
  Route Handlers
*/

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes); // main routes


// Database
database.connect();
 
/*
  Listen
*/
app.listen(8080, () => {
  console.log("Listening");
});
// Imports
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");

// Modules / Variables
const database = require('./modules/Database');

/*
  Middleware Settings
*/

const allowVercelRequests = (req, res, next) => {
  const deploymentUrl = req.headers['vercel-deployment-url'];
  if (deploymentUrl !== process.env.FRONTEND_ADDRESS) {
    return res.sendStatus(403);
  }
  next();
};

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 256, // Maximum 124 requests per minute
});

const dynamicCors = (req, res, next) => {
  const origin = req.get('Origin');

  // Check if the 'Origin' header is present in the request
  if (origin) {
    // Set the 'Access-Control-Allow-Origin' header to the value of the 'Origin' header
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Set other CORS headers and allow the required methods, headers, and credentials
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, day, vercel-deployment-url');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Respond with HTTP OK status (200)
    return res.sendStatus(200);
  }

  // Call the next middleware in the chain
  next();
};

/*
  Start of App
*/

const app = express();

/*
  Middleware
*/

// Rate-Limiting
// app.use(limiter);

app.use(dynamicCors);
app.use(allowVercelRequests);
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
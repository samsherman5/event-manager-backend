// Imports
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// Modules / Variables
const database = require('./modules/Database');

/*
  Middleware Settings
*/

const allowVercelRequests = (req, res, next) => {
  const deploymentUrl = req.headers['vercel-deployment-url'];
  console.log(deploymentUrl);
  if (deploymentUrl !== process.env.FRONTEND_ADDRESS) {
    res.sendStatus(403);
  }
  next();
};

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 256, // Maximum 124 requests per minute
});

/*
  Start of App
*/
const app = express();

/*
  Middleware
*/

// Rate-Limiting
// app.use(limiter);

app.use(cors({
  origin: true, // Allow all origins (replace with your specific origin if needed)
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'vercel-deployment-url'],
  credentials: true,
}));

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
/*
    Imports
*/
const express = require('express');
const router = express.Router();

/*
    Route Handlers
*/
router.all('*', (req, res) => {
    // Log the error or perform any necessary error handling tasks
    console.error(err);

    // Set the appropriate status code for the error
    res.sendStatus(err.status || 500);
});

router.all('*', (req, res) => {
    res.sendStatus(404); // sends status 404: not found after everything above is attempted
});

module.exports = router;
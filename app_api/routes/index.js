// Import Express library
const express = require("express");

// Create new Express router instance to handle routes
const router = express.Router();

// Import trips.js controller to handle route logic
const tripsController = require("../controllers/trips");

/*  
Define a router for "/trips" that handles GET requests
and use the tripsController to get trips data

Route: /trips
HTTP method: GET
Results: controller recieves data from trips
*/ 
router
    .route("/trips")
    .get(tripsController.tripsList);

// Get method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;

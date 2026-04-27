/* 
-----------------
**** EXPRESS ****
-----------------
*/

// Import Express library
const express = require("express");

// Create new Express router instance to handle routes
const router = express.Router();

// Enable JSON web tokens
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  console.log("In Middleware");

  //
  const authHeader = req.headers["authorization"];

  console.log("Auth Header: " + authHeader);

  if (authHeader == null) {
    console.log("Auth Header Require but NOT PRESENT!");
    return res.sendStatus(401);
  }

  //
  let headers = authHeader.split(" ");

  //
  if (headers.length < 1) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }

  //
  const token = authHeader.split(" ")[1];
  console.log("Token: " + token);

  //
  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }

  //
  console.log(process.env.JWT_SECRET);

  //
  console.log(jwt.decode(token));

  //
  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, verified) => {
      if (err) {
        return res.sendStatus(401).json("Token Validation Error!");
      }
      // Set the auth pram to the decoded object
      req.auth = verified;
    },
  );
  // we need to continue or this will hang forever
  next();
}

/* 
---------------------
**** CONTROLLERS ****
---------------------
*/

// Import trips.js controller to handle route logic
const tripsController = require("../controllers/trips");

// Import Athentication controller to handle user authentication
const authController = require("../controllers/authentication");

/* 
----------------
**** ROUTER ****
----------------
*/

// Handle user registration and pass through authenticator
router.route("/register").post(authController.register);

// Handle user login and authenticate credentials
router.route("/login").post(authController.login);

/*  
Define a router for "/trips" that handles GET requests
and use the tripsController to get trips data

Route: /trips
HTTP method: GET
Results: controller recieves data from trips
*/
router
  .route("/trips")
  .get(tripsController.tripsList) // GET
  .post(authenticateJWT, tripsController.tripsAddTrip); // POST

// GET method routes tripsFindByCode - requires parameter
// PUT method routes tripsUpdateTrip - requires parameter
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;

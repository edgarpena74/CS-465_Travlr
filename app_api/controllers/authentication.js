// Import mongoose library to connect with MongoDB
const mongoose = require("mongoose");

// Import User model for creating and managing users
const User = require("../models/user");

const passport = require("passport");

// Async function to handle user registration
const register = async (req, res) => {
  // Validate message to insure that all parameters are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  /* 
  Create a new User instance with request data
  */
  const user = new User({
    // Set user name from request body
    name: req.body.name,
    // Set email address from request body
    email: req.body.email,
    // Initialize password field (will be set securely below)
    password: "",
  });

  // Hash and store the user's password using model method
  user.setPassword(req.body.password);

  /*    
  Execute database save operation for the new user and 
  store result in q
  */
  const q = await user.save();

  // If save fails, return error response
  if (!q) {
    // database returned no data
    return res.status(400).json(err);
  } else {
    // Generate JWT token for authenticated access
    const token = user.generateJWT();

    // Return token to client
    return res.status(200).json(token);
  }
};

const login = (req, res, next) => {
  // Validate message to ensure that email and password are present
  if (!req.body.email || !req.body.password) {
    return res.status(400);
    json({ message: "All Fields Required" });
  }

  // Delegate authentication to passport module
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // error in authentication process
      return res.status(400).json(err);
    }
    if (user) {
      // Auth succeeded -generate JWT and return to caller
      const token = user.generateJWT();
      res.status(200).json({ token });
    } else {
      // Auth failed return error
      res.status(401).json(info);
    }
  })(req, res, next);
};

// Export register function for use in routes
module.exports = {
  register,
  login,
};

//  Package for handling authentication
const passport = require("passport");

//
const LocalStrategy = require("passport-local").Strategy;

// Import mongoose library to connect with MongoDB
const mongoose = require("mongoose");

// Import users.js MongoDB model
const Users = require("../models/user");

// Define variable as user model
const User = mongoose.model("users");

// Passport function to handle password validation
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    // Async function for user validation
    async (username, password, done) => {
      // Find unique user email
      const q = await User.findOne({ email: username }).exec();

      /* 
      If the username query does not match the the usernameField entry,
      return message to user that they entered the incrrect username
      */
      if (!q) {
        return done(null, false, {
          message: "Incorrect username.",
        });
      }

      /* 
      If the password that was entered doesnt match the password
      that is saved in the DB, return message to user that the 
      password they entered was incorrect
      */
      if (!q.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password",
        });
      }

      /* 
      Return the result of the query 'q' with no error.
      This passes the data back through the callback.
      */
      return done(null, q);
    },
  ),
);

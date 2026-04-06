/* 
Import required modules
*/

// Module for handling http-errors
var createError = require('http-errors');

// Imports Express web app framework
var express = require('express');

// Imports express path util 
var path = require('path');

// Imports cookie-parser middleware
var cookieParser = require('cookie-parser');

// Imports Morgan HTTP request logger middleware
var logger = require('morgan');


/* 
-------------------------------
*******************************
-------------------------------

*DEV NOTES FOR FUTURE REFERENCE*

-------------------------------
*******************************
-------------------------------

The flow of data for the 
"Import Router Modules" section is:

Router -> Controller -> Model(MongoDB)

This section of code is what imports modules from the 
app_server/routes directory. The router modules define 
application routes and pass incoming requests to the 
appropriate controller function

The controllers, located in the app_server/controllers directory
contain the core application logic. *IMPORTANT* This is where database queries are performed using the models which interract
with MongoDB
*/


/* 
--------------------------
* Import Router Modules * 
--------------------------
*/

// Import index router module from app_server directory
// to handle main application routes
var indexRouter = require('./app_server/routes/index');

// Import users router module from app server
// to handle user-related routes
var usersRouter = require('./app_server/routes/users')

// import travel router module from app server 
// to handle travel-related routes
var travelRouter = require('./app_server/routes/travel');

// Import index router to from app server
// to handle API routes
var apiRouter = require("./app_api/routes/index");

// Define handle bars variable
var handlebars = require('hbs'); 

/* 
------------------------
NOTE: Added in module 5
------------------------
*/
// Bring in the database model
require('./app_api/models/db');


/* 
--------------------------------
********************************
--------------------------------

*DEV NOTES FOR FUTURE REFERENCE*

--------------------------------
********************************
--------------------------------

Before we create the express app we need to
import modules needed to create the express app.
This is the initialation phase of the app 


We imported:
  
  1. http error handling module
  2. *IMPORTANT* Express framework
  3. Path utility module
  4. Cookie parser
  5. Morgan middleware

These are needed for basic web application functionality

After we imported the core modules we also imported:

  - Route Modules ot handle application routes
  - Handlebars(HBS) for view rendering
  - The database model for MongoDB interaction

*/

/* 
----------------------
* Create Express app *
----------------------
*/

var app = express();


/* 
----------------------
* View engine setup *
----------------------
*/

// Set path for views directory so Express can locate 
// and render HBS templates
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials (https://www.npmjs.com/package/hbs)
handlebars.registerPartials(__dirname + '/app_server/views/partials')

// Set view engine to Handlebars
app.set('view engine', 'hbs'); 


/* 
---------------------
* Middleware setup *
---------------------
*/

// Allows us to create dev messages in the terminal
// and shows app activity
app.use(logger('dev'));

// Enables express to parse JSON data
app.use(express.json());

/* 
Built in Express middleware 'urlencoded' that parses incoming
URL encoded form data from requests

  - {extended: false} means that the 'querystring' library 
    and supports basic key-value pairs

  - If this was {extended: true} then that means that the 'qs' library is used
    which supports more complex nested data structures

This middleware makes from data available in req.body
*/
app.use(express.urlencoded({ extended: false }));


// Middleware that parses cookiers from incoming requests
// and makes them available in req.cookies
app.use(cookieParser());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public'))); 


/* 
----------------
* Route Setup *
----------------

- Links routes to controllers
*/

// Homepage route
app.use('/', indexRouter); 

// User route
app.use('/users', usersRouter); 

// Travel page route
app.use('/travel', travelRouter); 

// Wire-up API routes
app.use("/api", apiRouter);



/* 
-------------------
* Error Handling *
-------------------
*/

// Catches requests that do not match any route
// and forwards a 404 error
app.use(function(req, res, next) {
  next(createError(404));
});

// User defined middleware function for error handling
//
// Checks the  application environment. If in 'development', 
// full error details are passed to the view, then rendered. 
// ** Otherwise, error details are hidden for security purposes. **

app.use(function(err, req, res, next) {
  // Set local variables for error display
  res.locals.message = err.message;

  // Pass error details to the view.
  // ** Shown only in development **
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Console logs error if web server could not complete request
  res.status(err.status || 500);

  // Render error view
  res.render('error');
});

// Export app
module.exports = app;
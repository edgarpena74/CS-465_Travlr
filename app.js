/* Import required modules */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




/* Import route files from app_server */
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users')
var travelRouter = require('./app_server/routes/travel');

// Define handle bars variable
var handlebars = require('hbs'); 

// Create Express app
var app = express();

/* 
View engine setup 
*/
app.set('views', path.join(__dirname, 'app_server', 'views'));
// register handlebars partials (https://www.npmjs.com/package/hbs)
handlebars.registerPartials(__dirname + '/app_server/views/partials')
app.set('view engine', 'hbs'); // Set view engine to Handlebars


// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public folder


// Route setup
app.use('/', indexRouter); // Homepage route
app.use('/users', usersRouter); // User route
app.use('/travel', travelRouter); // Travel page route

// Handle 404 errors
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set local variables for error display
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

// Export app
module.exports = app;
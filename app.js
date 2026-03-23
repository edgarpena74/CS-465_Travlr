// Import required modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

// Import route files from app_server
const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');

// Create Express app
const app = express();

// Set views folder to app_server/views
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Set view engine to Handlebars
app.set('view engine', 'hbs');

// Register partials directory for header/footer reuse
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
// Homepage route
app.use('/', indexRouter);

// Travel page route
app.use('/travel', travelRouter);

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
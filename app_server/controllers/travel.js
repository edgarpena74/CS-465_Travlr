var fs = require('fs');

// Read trips data from the JSON file
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Controller function for the travel page
// Renders the travel view with a title
const travel = (req, res) => {
  // Pass the trips data to the handlebars view
  res.render('travel', { title: 'Travlr Getaways', trips});
};
/* 
Please Note: It is not a best practice to read a JSON file every time the webserver processes a request. This is a method used during development to support rapid prototyping and should be replaced before the applications goes into production.
*/
// Export controller for route usage
module.exports = {
  travel
};
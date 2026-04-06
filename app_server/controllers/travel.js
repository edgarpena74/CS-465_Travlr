// var fs = require('fs');

// // Read trips data from the JSON file
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const tripsEndpoint = "http://localhost:3000/api/trips";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json"
  }
}

// // Controller function for the travel page
// // Renders the travel view with a title
// const travel = (req, res) => {
//   // Pass the trips data to the handlebars view
//   res.render('travel', { title: 'Travlr Getaways', trips});
// };
// /* 
// Please Note: It is not a best practice to read a JSON file every time the webserver processes a request. This is a method used during development to support rapid prototyping and should be replaced before the applications goes into production.
// */
/* 
Async function to handle requests to the API.
The process is:
  1. Log that the controller function has started
  2. Send a request to the API endpoint using fetch
  3. Convert the response to JSON format
  4. Validate the returned data
  5. Render the travel view with the retrieved data
  6. Handle any errors that occur during the request
*/
const travel = async function (req,res,next){

  // Log that the controller has started
  console.log("TRAVEL CONTROLLER BEGIN");

  // Fetch data from the trips API endpoint
  await fetch (tripsEndpoint, options)

    // Convert response to JSON
    .then((res) => res.json())

    // Process the returned JSON data
    .then((json) => {

      // Initialize message variable
      let message = null;

      // Check if response is not an array )unexpected API response)
      if(!(json instanceof Array)){
        message = "API lookup error";
        json = [];
      } 
      else{
        // Check if array is empty (no trips found)
        if(!json.length){
          message = "No trips exist in our database";
        }
      }

      // Render the travel view and pass data to the template
      res.render("travel", {title: "Travlr Getaways", trips:json, Message});
    })

    // Render the travel view and pass data to the template
    .catch((err) = res.status(500).send(err.message));

}
// Export controller for route usage
module.exports = {
  travel
};
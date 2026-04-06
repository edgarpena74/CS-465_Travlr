/* 

PURPOSE: trips.js contains methods to retrieve data
from MongoDB


*/



// Import Mongoose library to allow us to connect w/ MongoDB
const mongoose = require('mongoose');

// Register model
const Trip = require('../models/travlr');

// Import trips database model
const Model = mongoose.model('trips');


/*
GET: /trips ---- Lists all the trips

Uses...
HTTP Method: find()

Regardless of outcome, response must include HTML status code
and JSON message to the requesting client


-----------------------------------------------------------
* DEV NOTES FOR FUTURE REFERENCE *
------------------------------------------------------------
Purpose: Asynchronous method that uses find() to return all 
database entries, retuns an empty array if no data is found
or returns an array if the query was successful
------------------------------------------------------------

Essentially the method runs in this way

1. The await keyword pauses execution while the 
find() method queries the database and returns results
    **************************************************
    1.1 In module 5 we added the parameter to the find method inside of the function "tripsFindByCode".

        {'code': req.params.tripCode}

        This param returns a single record,code, for 
        all database objects


2. After the query if complete, the results are 
stored in the variable 'q' and then console logged

3. The data from 'q' is processed through the conditionals and 
does the following
    
    3.1 If not "q". An empty array. It sends the status 404 
    "Not Found" as JSON to the API response -> front-end
    
    3.2 Else there is  status code 202, successful request, and 
    the results are are returned as JSON to the API -> front end

 */
const tripsList = async(req, res) => {

    // Query the Trip model to find all records in the database
    const q = await Model
        // Empty filter means return all results
        .find({}) 
        // execute query and return the results
        .exec(); 
    
        // console log the results of the query
        console.log(q);

    // If no records are found after query executes
    if (!q) {
        // Database returned no data
        return res
            // Error code 404 -> Not Found
            .status(404)
            // Display error code
            .json(err);
    }
    // Otherwise return the results from the Trips model
    else {
        return res
        // Respond with 200 -> query was successful 
        // and data is being returned
        .status(200)
        // return the query results as JSON
        .json(q);
    }

};

const tripsFindByCode = async(req, res) => {
    // Query variable to find and return the "code"
    // param if it exists in the database entries
    const q = await Model
        // Return all entries with the "code" keyword
        .find({'code': req.params.tripCode})
        .exec({});
    
    // Console log results of the query
    console.log(q);

    // Error Handling
    if(!q)
    {
        // Database returned no error
        return res
            .status(404)
            .json(err)
    }
    // Return resulting trip list
    else
    {
        return res
        // Return status 200 -> query was successful 
        // and data is being returned
        .status(200)
        // Return query results as JSON
        .json(q);
    }
}

// Export madule as "tripsList"
module.exports = {
    tripsList,
    tripsFindByCode
};
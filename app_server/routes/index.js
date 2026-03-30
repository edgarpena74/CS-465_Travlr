// Import Express router
var express = require('express');
const router = express.Router();

// Import main controller
const ctrlMain  = require('../controllers/main');

// Define route for homepage ("/")
// Calls the main controller function
router.get('/', ctrlMain.index);

// Export router so app.js can use it
module.exports = router;
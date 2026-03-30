// Import Express router
var express = require('express');
const router = express.Router();

// Import travel controller
const controller = require('../controllers/travel');

// Define route for "/travel"
// Calls the travel controller function
router.get('/', controller.travel);

// Export router
module.exports = router;
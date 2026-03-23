// Import Express router
const express = require('express');
const router = express.Router();

// Import main controller
const controller = require('../controllers/main');

// Define route for homepage ("/")
// Calls the main controller function
router.get('/', controller.main);

// Export router so app.js can use it
module.exports = router;
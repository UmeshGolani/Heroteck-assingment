const express = require('express');
const submissionController = require('../controllers/submissionController');

const router = express.Router();

// Route for handling form submissions
router.post('/', submissionController.submitForm);

module.exports = router;

const Joi = require('joi');
const Submission = require('../models/submission');

// Validation schema for form submission
const submissionSchemaValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
});

const submitForm = async (req, res) => {
  try {
    // Validate the request body
    const { error } = submissionSchemaValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create a new submission instance
    const newSubmission = new Submission({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    });

    // Save the submission to the database
    await newSubmission.save();

    // Return a "Thank you" response
    return res.status(201).json({ message: 'Thank you for your submission!' });
  } catch (err) {
    console.error('Error submitting form:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  submitForm
};

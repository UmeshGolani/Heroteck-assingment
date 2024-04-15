const mongoose = require('mongoose');

// Define Submission schema
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const submissionRoutes = require('../routes/submissionRoutes');

// require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://umesh:umesh@basicform.vfixr0h.mongodb.net/?retryWrites=true&w=majority&appName=basicform')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/submit', submissionRoutes);

module.exports = app;

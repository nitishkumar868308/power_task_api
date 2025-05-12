const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const loadCalculatorRoutes = require('./routes/loadCalculatorRoutes');
const verifyToken = require('./middleware/verifyToken');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/load-calculator', verifyToken, loadCalculatorRoutes);  // Protect load calculator routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

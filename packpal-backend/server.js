require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const authRoutes = require('./routes/auth');
const planTripRoutes = require('./routes/planTrip');
const packagesRoutes = require('./routes/packages');
const dashboardRoute = require('./routes/dashboard');
const journeyRoutes = require('./routes/journey');
const profileRoutes = require('./routes/profile'); // <-- Added profile routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/plan-trip', planTripRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/journey', journeyRoutes);
app.use('/api/profile', profileRoutes); // <-- Register profile route

// Root route
app.get('/', (req, res) => {
  res.send('PackPal Backend Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

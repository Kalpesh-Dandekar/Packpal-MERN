// routes/dashboard.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // token validation
const User = require('../models/User');
const Package = require('../models/Package');
const Trip = require('../models/Trip');

// Protected dashboard route
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Provided by auth middleware

    // Get user info
    const user = await User.findById(userId).select('username email');

    // Fetch stats
    const activePackages = await Package.countDocuments({ user: userId, status: 'active' });
    const upcomingTrips = await Trip.countDocuments({ user: userId, date: { $gte: new Date() } });
    const pendingActions = await Trip.countDocuments({ user: userId, status: 'pending' });

    res.json({
      user,
      stats: {
        activePackages,
        upcomingTrips,
        pendingActions
      }
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

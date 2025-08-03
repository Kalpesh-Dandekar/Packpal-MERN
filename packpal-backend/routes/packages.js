const express = require('express');
const auth = require('../middleware/auth');
const Trip = require('../models/Trip');

const router = express.Router();

// Use '/' here because the router is mounted on '/api/packages'
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });

    // Group trips by location
    const groupedByLocation = {};

    trips.forEach((trip) => {
      const loc = trip.location || 'Unknown Location';

      if (!groupedByLocation[loc]) {
        groupedByLocation[loc] = [];
      }

      groupedByLocation[loc].push({
        id: trip._id,
        tripName: trip.tripName,
        location: trip.location,
        tier: trip.packageType,
        price: trip.totalCost,
        duration: `${trip.startDate.toISOString().slice(0, 10)} to ${trip.endDate.toISOString().slice(0, 10)}`,
        travelers: trip.travelers,
        specialRequests: trip.specialRequests,
        tripType: trip.tripType,
      });
    });

    res.json({ packages: groupedByLocation });
  } catch (err) {
    console.error('Error fetching packages:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

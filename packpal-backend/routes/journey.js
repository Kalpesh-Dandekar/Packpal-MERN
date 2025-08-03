const express = require('express');
const auth = require('../middleware/auth');
const Journey = require('../models/Journey');

const router = express.Router();

// GET /api/journey/upcoming
// Get upcoming journeys for the authenticated user
router.get('/upcoming', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time to start of the day

    const journeys = await Journey.find({
      user: req.user.id,
      startDate: { $gte: today },
    }).sort({ startDate: 1 });

    res.json({ journeys });
  } catch (error) {
    console.error('Error fetching upcoming journeys:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

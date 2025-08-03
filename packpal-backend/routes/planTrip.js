const express = require('express');
const auth = require('../middleware/auth');
const Trip = require('../models/Trip');

const router = express.Router();

// POST /api/plan-trip
router.post('/', auth, async (req, res) => {
  try {
    const {
      tripName,
      location,
      startDate,
      endDate,
      travelers,
      tripType,
      packageType,
      specialRequests,
      totalCost,
      status,
      isFavorite,
    } = req.body;

    if (!location || !startDate || !endDate || !tripType || !packageType || !totalCost) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const validStatuses = ['upcoming', 'completed', 'cancelled'];

    const newTrip = new Trip({
      user: req.user.id,
      tripName: tripName?.trim() || 'Unnamed Trip',
      location,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelers: Number(travelers) || 1,
      tripType,
      packageType,
      specialRequests: specialRequests?.trim() || '',
      totalCost: Number(totalCost),
      status: validStatuses.includes(status) ? status : 'upcoming',
      isFavorite: isFavorite === true || isFavorite === 'true' ? true : false,
    });

    await newTrip.save();
    console.log('New trip saved:', newTrip);

    res.status(201).json({ message: 'Trip planned successfully', trip: newTrip });
  } catch (err) {
    console.error('Plan trip error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/plan-trip
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, favorite } = req.query;

    const filter = { user: userId };

    const validStatuses = ['upcoming', 'completed', 'cancelled'];

    if (status && validStatuses.includes(status)) {
      filter.status = status;
    }
    if (favorite === 'true') {
      filter.isFavorite = true;
    }

    console.log('GET /api/plan-trip filter:', filter);

    const trips = await Trip.find(filter).sort({ startDate: 1 });

    console.log(`Trips found for user ${userId}:`, trips.length);

    res.json({ trips });
  } catch (err) {
    console.error('Get trips error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/plan-trip/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const tripId = req.params.id;
    const userId = req.user.id;

    // Find the trip by ID and user
    const trip = await Trip.findOne({ _id: tripId, user: userId });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Delete the trip
    await Trip.deleteOne({ _id: tripId });

    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Delete trip error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/plan-trip/:id/complete
router.patch('/:id/complete', auth, async (req, res) => {
  try {
    const tripId = req.params.id;
    const userId = req.user.id;

    // Find trip owned by user
    const trip = await Trip.findOne({ _id: tripId, user: userId });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Update status to completed
    trip.status = 'completed';
    await trip.save();

    res.json({ message: 'Trip marked as completed', trip });
  } catch (err) {
    console.error('Mark trip completed error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

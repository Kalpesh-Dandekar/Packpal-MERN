const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phone, city, district } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      city,
      district,
    });

    await newUser.save();

    // 🔐 Generate JWT token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Send token and user details in response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
router.get('/protected-route', auth, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

// Fixed Dashboard route
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

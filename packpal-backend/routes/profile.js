const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);

module.exports = router;

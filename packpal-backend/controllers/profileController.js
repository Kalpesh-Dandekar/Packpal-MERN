const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password'); // exclude password

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, phone, city, district } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, phone, city, district },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

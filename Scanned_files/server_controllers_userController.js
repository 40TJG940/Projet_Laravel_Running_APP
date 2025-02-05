const User = require('../models/User');
const Stats = require('../models/Stats');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne({ user: req.user.id });
    if (!stats) {
      return res.json({
        totalDistance: 0,
        totalDuration: 0,
        totalRuns: 0
      });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const Profile = require('../models/Profile');
const seedData = require('../services/seedData');

// @desc    Get portfolio profile data
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Fallback to seedData if DB is empty
      profile = seedData.profile;
    }
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update portfolio profile
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };

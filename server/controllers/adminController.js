const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'super_secret_jwt_token_change_in_production_key_12345',
    { expiresIn: '7d' }
  );
};

// @desc    Admin login & obtain JWT
// @route   POST /api/admin/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const admin = await AdminUser.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.'
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.'
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get currently logged in admin
// @route   GET /api/admin/me
// @access  Private (Admin)
const getMe = async (req, res, next) => {
  try {
    const admin = await AdminUser.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      admin
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, getMe };

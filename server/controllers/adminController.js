const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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

    const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'anjisiddam01@gmail.com').toLowerCase();
    const defaultAdminPass = process.env.ADMIN_PASSWORD || 'AdminSecurePassword@2026';

    // If connected to MongoDB
    if (mongoose.connection.readyState === 1) {
      const admin = await AdminUser.findOne({ email: email.toLowerCase() });

      if (admin) {
        const isMatch = await admin.matchPassword(password);
        if (isMatch) {
          const token = generateToken(admin._id.toString());
          return res.status(200).json({
            success: true,
            message: 'Admin authenticated successfully',
            token,
            admin: {
              id: admin._id,
              email: admin.email,
              role: admin.role
            }
          });
        }
      }
    }

    // Direct environment credentials check
    if (email.toLowerCase() === defaultAdminEmail && password === defaultAdminPass) {
      const token = generateToken('admin-root');
      return res.status(200).json({
        success: true,
        message: 'Admin authenticated successfully',
        token,
        admin: {
          id: 'admin-root',
          email: defaultAdminEmail,
          role: 'admin'
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid administrative credentials.'
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
    if (req.user.id === 'admin-root') {
      return res.status(200).json({
        success: true,
        admin: req.user
      });
    }

    const admin = await AdminUser.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      admin: admin || req.user
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, getMe };

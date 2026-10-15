const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_jwt_token_change_in_production_key_12345'
    );

    if (decoded.id === 'admin-root') {
      req.user = {
        id: 'admin-root',
        email: process.env.ADMIN_EMAIL || 'anjisiddam01@gmail.com',
        role: 'admin'
      };
      return next();
    }

    if (mongoose.connection.readyState === 1) {
      const user = await AdminUser.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token no longer exists.'
        });
      }
      req.user = user;
    } else {
      req.user = {
        id: decoded.id,
        email: process.env.ADMIN_EMAIL || 'anjisiddam01@gmail.com',
        role: 'admin'
      };
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.'
    });
  }
};

module.exports = { protect };

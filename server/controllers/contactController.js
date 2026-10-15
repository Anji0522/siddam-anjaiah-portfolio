const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage');

// In-memory fallback message store if MongoDB is offline in development
const inMemoryMessages = [];

// @desc    Submit new contact message
// @route   POST /api/contact
// @access  Public
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Strict validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required (minimum 2 characters).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (!subject || subject.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Subject is required (minimum 3 characters).'
      });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message is required (minimum 10 characters).'
      });
    }

    if (message.trim().length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message is too long (maximum 5000 characters).'
      });
    }

    let savedMessage;

    if (mongoose.connection.readyState === 1) {
      savedMessage = await ContactMessage.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim()
      });
    } else {
      savedMessage = {
        _id: 'msg-' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date(),
        read: false
      };
      inMemoryMessages.unshift(savedMessage);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: {
        id: savedMessage._id,
        createdAt: savedMessage.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getContactMessages = async (req, res, next) => {
  try {
    let messages;

    if (mongoose.connection.readyState === 1) {
      messages = await ContactMessage.find().sort({ createdAt: -1 });
    } else {
      messages = inMemoryMessages;
    }

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private (Admin)
const markMessageAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const message = await ContactMessage.findById(id);
      if (!message) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
      message.read = req.body.read !== undefined ? req.body.read : true;
      await message.save();
      return res.status(200).json({ success: true, message: 'Message status updated', data: message });
    } else {
      const msg = inMemoryMessages.find((m) => m._id === id);
      if (!msg) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
      msg.read = req.body.read !== undefined ? req.body.read : true;
      return res.status(200).json({ success: true, message: 'Message status updated', data: msg });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const message = await ContactMessage.findByIdAndDelete(id);
      if (!message) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
    } else {
      const idx = inMemoryMessages.findIndex((m) => m._id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
      inMemoryMessages.splice(idx, 1);
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage
};

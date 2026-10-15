const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .post(contactLimiter, submitContactMessage)
  .get(protect, getContactMessages);

router.route('/:id/read')
  .put(protect, markMessageAsRead);

router.route('/:id')
  .delete(protect, deleteContactMessage);

module.exports = router;

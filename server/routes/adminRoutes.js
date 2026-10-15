const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, login);
router.get('/me', protect, getMe);

module.exports = router;

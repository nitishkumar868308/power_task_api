const express = require('express');
const router = express.Router();
const { register, login, validateToken } = require('../controllers/authController');

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

// Token Validation (for protected routes)
router.get('/validate', validateToken);

module.exports = router;

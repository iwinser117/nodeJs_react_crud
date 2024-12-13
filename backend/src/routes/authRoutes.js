const express = require('express');
const rateLimit = require('express-rate-limit');
const { register, login } = require('../controllers/authController');

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Demasiados intentos de registro. Intente nuevamente más tarde.',
  standardHeaders: true,
  legacyHeaders: false, 
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Demasiados intentos de inicio de sesión. Intente nuevamente más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

const router = express.Router();

router.post('/register', registerLimiter, register);

router.post('/login', loginLimiter, login);

module.exports = router;
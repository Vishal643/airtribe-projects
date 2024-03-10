const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/user');
const checkUserIsAuthenticated = require('../middleware/auth');

router.post('/signup', register);
router.post('/login', login);

module.exports = router;

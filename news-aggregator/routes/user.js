const express = require('express');
const router = express.Router();

const { register, login, getUserPreferences, updateUserPreferences } = require('../controllers/user');
const checkUserIsAuthenticated = require('../middleware/auth');

router.post('/signup', register);
router.post('/login', login);

router.get('/preferences', checkUserIsAuthenticated, getUserPreferences);
router.put('/preferences', checkUserIsAuthenticated, updateUserPreferences);

module.exports = router;

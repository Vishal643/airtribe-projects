const express = require('express');
const router = express.Router();

const {
	register,
	login,
	updateProfile,
	logout,
} = require('../controllers/user');
const { auth } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

router.put('/:userId/update', auth, updateProfile);

router.post('/logout', auth, logout);

module.exports = router;

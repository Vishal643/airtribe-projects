const express = require('express');
const router = express.Router();

const {
	getAllEvents,
	getEventById,
	createdEvents,
	updateEventById,
	deleteEventById,
	registerEventById,
} = require('../controllers/event');

const { checkUserIsAuthenticated } = require('../middleware/auth');

router.get('/', checkUserIsAuthenticated, getAllEvents);

router.get('/:id', checkUserIsAuthenticated, getEventById);

router.post('/', checkUserIsAuthenticated, createdEvents);

router.put('/:id', checkUserIsAuthenticated, updateEventById);

router.delete('/:id', checkUserIsAuthenticated, deleteEventById);

router.post('/:id/register', checkUserIsAuthenticated, registerEventById);

module.exports = router;

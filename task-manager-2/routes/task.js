const express = require('express');
const { auth } = require('../middleware/auth');

const {
	createTask,
	getTasks,
	updatedTaskStatusById,
	assignTask,
	addComment,
} = require('../controllers/task');

const router = express.Router();

router.post('/', auth, createTask);

router.get('/all', auth, getTasks);

router.put('/:taskId', auth, updatedTaskStatusById);

router.post('/:taskId/assign', auth, assignTask);

router.post('/:taskId/comment', auth, addComment);

module.exports = router;

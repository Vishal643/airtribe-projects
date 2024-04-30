const { Task } = require('../models/task');
const { Team } = require('../models/team');

const createTask = async (req, res) => {
	try {
		// validations
		if (!req.body.title) {
			return res.status(400).send({ message: 'Title is required' });
		}
		if (!req.body.description) {
			return res.status(400).send({ message: 'Description is required' });
		}
		if (!req.body.dueDate) {
			return res.status(400).send({ message: 'Due date is required' });
		}

		const task = new Task({ ...req.body, owner: req.user._id });
		await task.save();
		res.status(201).send({ task, message: 'Task created successfully' });
	} catch (error) {
		res.status(400).send({ message: error.message, error: true });
	}
};

const getTasks = async (req, res) => {
	try {
		// As a user, I want to filter tasks based on their status (e.g., open, completed).
		// As a user, I want to search for tasks by title or description.
		const whereQuery = {
			assignedTo: req.user._id,
		};
		if (req.query.status) {
			whereQuery.status = req.query.status;
		}
		if (req.query.search) {
			whereQuery.$or = [
				{ title: { $regex: req.query.search, $options: 'i' } },
				{ description: { $regex: req.query.search, $options: 'i' } },
			];
		}
		const tasks = await Task.find(whereQuery);
		res.send({ tasks, message: 'Tasks retrieved successfully' });
	} catch (error) {
		res.status(500).send({ message: error.message, error: true });
	}
};

const updatedTaskStatusById = async (req, res) => {
	try {
		const { taskId } = req.params;
		const task = await Task.findOne({ _id: taskId, assignedTo: req.user._id });

		if (!task) {
			return res.status(404).send({ message: 'Task not found' });
		}

		if (req.body.status) {
			task.history.push({
				status: req.body.status,
				updatedBy: req.user._id,
				updatedAt: new Date(),
			});
			task.status = req.body.status;
		}
		res.send({ task, message: 'Tasks retrieved successfully' });
	} catch (error) {
		res.status(500).send({ message: error.message, error: true });
	}
};

const assignTask = async (req, res) => {
	try {
		const { taskId } = req.params;
		const { assignedTo } = req.body;

		const team = await Team.findOne({ members: { $in: [req.user._id] } });
		if (!team) {
			return res.status(404).send({ message: 'Team not found' });
		}

		if (team) {
			const isAssignee = team.members.includes(assignedTo);
			if (!isAssignee) {
				return res
					.status(403)
					.send({ message: 'Assignee is not a member of the team' });
			}
		}

		const task = await Task.findOne({ _id: taskId, assignedTo: req.user._id });

		if (!task) {
			return res.status(404).send({ message: 'Task not found' });
		}

		if (assignedTo) {
			task.assignedTo = assignedTo;
			task.history.push({
				status: 're-assigned',
				updatedBy: req.user._id,
				updatedAt: new Date(),
			});
		}
		await task.save();
		res.send({ task, message: 'Task assigned successfully' });
	} catch (error) {
		res.status(500).send({ message: error.message, error: true });
	}
};

const addComment = async (req, res) => {
	try {
		const { taskId } = req.params;
		const { comment, attachment } = req.body;

		const task = await Task.findOne({ _id: taskId, assignedTo: req.user._id });
		if (!task) {
			return res.status(404).send({ message: 'Task not found' });
		}

		task.comments.push({
			comment,
			commentedBy: req.user._id,
			attachments: attachment,
			commentedAt: new Date(),
		});
		await task.save();
		res.send({ task, message: 'Comment added successfully' });
	} catch (error) {
		res.status(500).send({ message: error.message, error: true });
	}
};

module.exports = {
	createTask,
	getTasks,
	updatedTaskStatusById,
	assignTask,
	addComment,
};

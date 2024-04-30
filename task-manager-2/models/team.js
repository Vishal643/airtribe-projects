const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task',
			},
		],
	},
	{
		timestamps: true,
	},
);

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };

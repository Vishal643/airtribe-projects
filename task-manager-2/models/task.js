const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		dueDate: { type: Date },
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: String,
			enum: ['open', 'in-progress', 'hold', 'completed'],
			required: true,
			default: 'open',
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null,
		},
		history: [
			{
				status: {
					type: String,
					enum: ['open', 'in-progress', 'hold', 'completed', 're-assigned'],
					required: true,
				},
				updatedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				updatedAt: { type: Date, required: true },
			},
		],
		comments: [
			{
				comment: { type: String, required: true },
				commentedBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				attachments: [
					{
						name: { type: String, required: true },
						url: { type: String, required: true },
					},
				],
				repliedTo: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'comments',
					default: null,
				},
				commentedAt: { type: Date, required: true },
			},
		],
	},
	{
		timestamps: true,
	},
);

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };

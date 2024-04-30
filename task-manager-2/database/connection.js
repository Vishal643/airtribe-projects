const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		mongoose.connect('mongodb://localhost:27017/task_manager');
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error(error);
	}
};

module.exports = connectDB;

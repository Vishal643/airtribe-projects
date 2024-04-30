const express = require('express');
const connectDB = require('./database/connection');

//routes
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const teamRouter = require('./routes/team');

const env = require('dotenv');

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseRoute = '/api/v1';

// health check route
app.get(`${baseRoute}/health`, (req, res) => {
	res.status(200).send({ message: 'Server is up and running' });
});
// all routes
app.use(`${baseRoute}/users`, userRouter);
app.use(`${baseRoute}/tasks`, taskRouter);
app.use(`${baseRoute}/teams`, teamRouter);

// Other CRUD operations for tasks

app.listen(PORT, () => {
	// MongoDB Connection
	connectDB().then((res, err) => {
		if (err) {
			console.log('Error connecting to MongoDB');
			return;
		}
		console.log(`Server is running on port ${PORT}`);
	});
});

module.exports = app;

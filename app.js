const express = require('express');
const env = require('dotenv');

env.config();

const userRouter = require('./routes/user');
const newsRouter = require('./routes/news');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseRoute = '';

// health check route
app.get(`${baseRoute}/health`, (req, res) => {
	res.status(200).send({ message: 'Server is up and running' });
});

// all routes
app.use(`${baseRoute}/users`, userRouter);
app.use(`${baseRoute}/news`, newsRouter);

app.listen(port, (err) => {
	if (err) {
		return console.log('Something bad happened', err);
	}
	console.log(`Server is listening on ${port}`);
});

module.exports = app;

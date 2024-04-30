const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '765hgfsda';

const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, email, password: hashedPassword });
		await user.save();
		res.status(201).send({ message: 'User created successfully' });
	} catch (error) {
		res.status(400).send({ message: error.message, error: true });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('User not found');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid credentials');
		}
		user.password = undefined;
		const token = jwt.sign({ _id: user._id }, JWT_SECRET);
		res.send({ user, token });
	} catch (error) {
		res.status(401).send(error.message);
	}
};

const updateProfile = async (req, res) => {
	try {
		const { userId } = req.params;
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ message: 'User not found', error: true });
		}
		// check if email is already in use
		const emailExists = await User.findOne({ email });
		if (emailExists && !emailExists._id.equals(userId)) {
			return res
				.status(400)
				.send({ message: 'Email is already in use', error: true });
		}

		// check if username is already in use
		const usernameExists = await User.findOne({ username });
		if (usernameExists && !usernameExists._id.equals(userId)) {
			return res
				.status(400)
				.send({ message: 'Username is already in use', error: true });
		}

		req.user.username = username;
		req.user.email = email;
		req.user.password = hashedPassword;
		await req.user.save();
		res.send({ message: 'Profile updated successfully' });
	} catch (error) {
		res.status(400).send({ message: error.message, error: true });
	}
};

const logout = async (req, res) => {
	try {
		req.token = null;
		req.user = null;
		await req.user.save();
		res.send({ message: 'Logged out successfully' });
	} catch (error) {
		res.status(500).send({ message: error.message, error: true });
	}
};

module.exports = {
	register,
	login,
	updateProfile,
	logout,
};

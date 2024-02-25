const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'data');
const filePath = path.join(dirPath, 'data.json');

// Ensure the directory exists
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

const data = fs.readFileSync(filePath, { encoding: 'utf8' });
const parsedData = JSON.parse(data);
let usersData = parsedData.users || [];

const register = async (req, res) => {
	try {
		const { password, name, email, preferences } = req.body;

		if (!name || !email || !password) {
			return res.status(400).send({ message: 'Missing required fields' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = { name, email, password: hashedPassword, preferences };

		// Check if user already exists
		const existingUser = usersData.find((u) => u.email === email);
		if (existingUser) {
			return res.status(400).send({ message: 'User already exists' });
		}
		usersData.push(user);
		// write to file
		fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), {
			encoding: 'utf8',
		});
		res.status(200).send({ message: 'Registration Successfull' });
	} catch (error) {
		console.log('error', error);
		res.status(500).send({ message: 'Internal server error' });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = usersData.find((u) => u.email === email);
	if (!user) {
		return res.status(400).send({ message: 'User not found' });
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (isMatch) {
		const token = jwt.sign({ email }, JWT_SECRET);
		res.status(200).send({ message: 'Login successfull', token });
	} else {
		res.status(401).send({ message: 'Invalid credentials' });
	}
};

const getUserPreferences = async (req, res) => {
	const { email } = req.user;
	const data = fs.readFileSync(filePath, { encoding: 'utf8' });
	const parsedData = JSON.parse(data);
	const usersData = parsedData.users || [];
	const user = usersData.find((u) => u.email === email);
	if (!user) {
		return res.status(404).send({ message: 'User not found' });
	}
	res.status(200).send({ preferences: user.preferences });
};

const updateUserPreferences = async (req, res) => {
	const { preferences } = req.body;
	const data = fs.readFileSync(filePath, { encoding: 'utf8' });
	const parsedData = JSON.parse(data);
	const usersData = parsedData.users || [];
	const { email } = req.user;
	const user = usersData.find((u) => u.email === email);

	if (user) {
		user.preferences = preferences;
		fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), {
			encoding: 'utf8',
		});
		res
			.status(200)
			.send({ message: 'Preferences updated', preferences: preferences });
	} else {
		res.status(404).send({ message: 'User not found' });
	}
};

module.exports = {
	register,
	login,
	getUserPreferences,
	updateUserPreferences,
};

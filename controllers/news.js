const axios = require('axios');

const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'data');
const filePath = path.join(dirPath, 'data.json');

// Ensure the directory exists
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

const getNews = async (req, res) => {
	const { email } = req.user;
	const data = fs.readFileSync(filePath, { encoding: 'utf8' });
	const parsedData = JSON.parse(data);
	const usersData = parsedData.users || [];
	const user = usersData.find((u) => u.email === email);
	if (!user || !user.preferences || user.preferences.length === 0) {
		return res.status(400).send({ message: 'No preferences set' });
	}
	const API_KEY = process.env.API_KEY;
	try {
		const response = await axios.get(
			`https://newsapi.org/v2/top-headlines?country=us&category=${user.preferences[0]}&apiKey=${API_KEY}`,
		);
		if (response.data.articles.length === 0) {
			return res.status(200).send({ message: 'No news found', news: [] });
		}
		res.status(200).send({ news: response.data.articles });
	} catch (error) {
		res.status(500).send({ message: 'Error fetching news' });
	}
};

module.exports = {
	getNews,
};

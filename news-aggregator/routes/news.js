const express = require('express');
const router = express.Router();

const { getNews } = require('../controllers/news');

const checkUserIsAuthenticated = require('../middleware/auth');

router.get('/', checkUserIsAuthenticated, getNews);

module.exports = router;

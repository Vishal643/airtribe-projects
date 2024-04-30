const express = require('express');
const { auth } = require('../middleware/auth');

const { addTeamMember, createdTeam } = require('../controllers/team');

const router = express.Router();

router.post('/', auth, createdTeam);

router.put('/:teamId/add-member', auth, addTeamMember);

module.exports = router;

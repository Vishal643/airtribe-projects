const { User } = require('../models/user');
const { Team } = require('../models/team');

const createdTeam = async (req, res) => {
	try {
		const { teamName, members } = req.body;
		// check if any of the ids in the members array is not a valid user id
		const invalidUsers = await User.find({ _id: { $nin: members } });
		if (invalidUsers.length) {
			return res
				.status(404)
				.send({ message: 'Invalid user id(s) in the members array' });
		}
		const team = new Team({ teamName, members: [req.user._id, ...members] });
		await team.save();
		res.status(201).send({ team, message: 'Team created successfully' });
	} catch (error) {
		res.status(400).send({ message: error.message, error: true });
	}
};

const addTeamMember = async (req, res) => {
	try {
		const { teamId } = req.params;
		const { memberId } = req.body;

		const team = await Team.findOne({
			_id: teamId,
			members: { $in: [req.user._id] },
		});

		if (!team) {
			return res.status(404).send({ message: 'Team not found' });
		}

		const isMember = team.members.includes(memberId);
		if (isMember) {
			return res
				.status(403)
				.send({ message: 'User is already a member of the team' });
		}
		// validate if the user is a valid user
		const user = await User.findById(memberId);
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}
		team.members.push(memberId);
		await team.save();
		res.send({ team, message: 'Member added successfully' });
	} catch (error) {
		res.status(500).send({ message: error.message, error: true });
	}
};

module.exports = {
	createdTeam,
	addTeamMember,
};

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
let eventsData = parsedData.events || [];

const getAllEvents = async (req, res) => {
	try {
		if (!eventsData) {
			return res.status(200).send({ message: 'No events found', events: [] });
		}
		return res
			.status(200)
			.send({ message: 'Events found', events: eventsData });
	} catch (error) {
		console.log('error', error);
		res.status(500).send({ message: 'Internal server error' });
	}
};

const getEventById = async (req, res) => {
	try {
		const { id } = req.params;
		const event = eventsData.find((e) => e.id == id);
		if (!event) {
			return res.status(404).send({ message: 'No event found' });
		}
		res.status(200).send({ message: 'Event found', event });
	} catch (error) {
		console.log('error', error);
		res.status(500).send({ message: 'Internal server error' });
	}
};

const createdEvents = async (req, res) => {
	try {
		const { description, date, time, duration } = req.body;

		if (!description || !date || !time || !duration) {
			return res.status(400).send({ message: 'Required fields are missing' });
		}
		if (req.user.role !== 'organizer') {
			return res
				.status(403)
				.send({ message: 'You are not authorised to perform this action' });
		}

		const event = {
			id: eventsData.length + 1,
			description,
			date,
			time,
			duration,
			createdBy: req.user.email,
			participants: [],
		};
		eventsData.push(event);
		// write to file
		fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), {
			encoding: 'utf8',
		});
		return res
			.status(201)
			.send({ message: 'Event created successfully', event });
	} catch (error) {
		console.log('error', error);
		return res.status(500).send({ message: 'Internal server error' });
	}
};

const updateEventById = async (req, res) => {
	try {
		const { description, date, time, duration } = req.body;

		const event = eventsData.find((e) => e.id == req.params.id);

		if (!event) {
			return res.status(404).send({ message: 'Event not found' });
		}

		if (event.createdBy !== req.user.email) {
			return res
				.status(403)
				.send({ message: 'You are not authorised to perform this action.' });
		}

		// check if event has already started and if yes then do not allow to update
		const eventStartTime = new Date(event.time);
		const currentDateTime = new Date();
		if (eventStartTime < currentDateTime) {
			return res.status(400).send({
				message: 'You can not update now as event has already started',
			});
		}

		if (!description && !date && !time && !duration) {
			return res.status(400).send({ message: 'Required fields are missing' });
		}

		const updatedEvents = eventsData.map((e) => {
			if (e.id == req.params.id) {
				return {
					...e,
					description: description || e.description,
					date: date || e.date,
					time: time || e.time,
					duration: duration || e.duration,
				};
			}
			return e;
		});

		// make changes in eventsData
		parsedData.events = updatedEvents;

		fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), {
			encoding: 'utf8',
		});

		const updatedEvent = eventsData.find((e) => e.id == req.params.id);

		return res
			.status(200)
			.send({ message: 'Event updated successfully', events: updatedEvent });
	} catch (error) {
		console.log('error', error);
		return res.status(500).send({ message: 'Internal server error' });
	}
};

const deleteEventById = async (req, res) => {
	try {
		const { id } = req.params;
		const event = eventsData.find((e) => e.id == id);
		if (!event) {
			return res.status(200).send({ message: 'No event found' });
		}

		if (event.createdBy !== req.user.email) {
			return res
				.status(403)
				.send({ message: 'You are not authorised to perform this action' });
		}

		const updatedEventsData = eventsData.filter((e) => e.id != id);

		parsedData.events = updatedEventsData;

		fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), {
			encoding: 'utf8',
		});

		res.status(200).send({ message: 'Event deleted successfully' });
	} catch (error) {
		console.log('error', error);
		res.status(500).send({ message: 'Internal server error' });
	}
};

const registerEventById = async (req, res) => {
	try {
		const { id } = req.params;
		const event = eventsData.find((e) => e.id == id);
		if (!event) {
			return res.status(200).send({ message: 'No event found' });
		}

		// check if event has already started and if yes then do not allow registration
		const eventStartTime = new Date(event.time);
		const currentDateTime = new Date();
		if (eventStartTime < currentDateTime) {
			return res.status(400).send({
				message:
					'You can not register for the event now as event has already started',
			});
		}

		if (event.participants.includes(req.user.email)) {
			return res
				.status(403)
				.send({ message: 'You are already registered for this event' });
		}

		event.participants.push(req.user.email);

		fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), {
			encoding: 'utf8',
		});

		res.status(200).send({ message: 'Successfully registered for the event' });
	} catch (error) {
		console.log('error', error);
		res.status(500).send({ message: 'Internal server error' });
	}
};

module.exports = {
	getEventById,
	getAllEvents,
	createdEvents,
	updateEventById,
	deleteEventById,
	registerEventById,
};

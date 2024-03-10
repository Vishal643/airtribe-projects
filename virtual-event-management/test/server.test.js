const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const server = supertest(app);

const mockUser = {
	name: 'Clark Kent',
	email: 'clark@superman.com',
	password: 'Krypt()n8',
};

const mockEvent = {
	id: 1,
	date: '2024/03/10 10:00',
	time: '2024/03/10 12:30',
	duration: '2 hour',
	description: 'This is a dummy event 2 updated',
	participants: [],
	createdBy: 'clark@superman.com',
};

let token = '';

// Auth tests

tap.test('POST /users/signup', async (t) => {
	const response = await server.post('/users/signup').send(mockUser);
	console.log('response', response.status);
	t.equal(response.status, 200);
	t.end();
});

tap.test('POST /users/signup with missing email', async (t) => {
	const response = await server.post('/users/signup').send({
		name: mockUser.name,
		password: mockUser.password,
	});
	t.equal(response.status, 400);
	t.end();
});

tap.test('POST /users/login', async (t) => {
	const response = await server.post('/users/login').send({
		email: mockUser.email,
		password: mockUser.password,
	});
	t.equal(response.status, 200);
	t.hasOwnProp(response.body, 'token');
	token = response.body.token;
	t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
	const response = await server.post('/users/login').send({
		email: mockUser.email,
		password: 'wrongpassword',
	});
	t.equal(response.status, 401);
	t.end();
});

// Events tests
tap.test('GET /events/1', async (t) => {
	const response = await server
		.get('/events/1')
		.set('Authorization', `Bearer ${token}`);
	t.equal(response.status, 200);
	t.hasOwnProp(response.body, 'event');
	t.same(response.body.event, mockUser.event);
	t.end();
});

tap.test('GET /events/1 without token', async (t) => {
	const response = await server.get('/events/1');
	t.equal(response.status, 401);
	t.end();
});

tap.test('PUT /events/1', async (t) => {
	const response = await server
		.put('/users/1')
		.set('Authorization', `Bearer ${token}`)
		.send({
			description: "I'm going to be there!",
		});
	t.equal(response.status, 200);
});

tap.test('POST /events', async (t) => {
	const response = await server.post('/events').send(mockEvent);

	t.equal(response.status, 200);
	t.end();
});

tap.test('POST /events/1/register', async (t) => {
	const response = await server.post('/events/1/register');
	t.equal(response.status, 200);
	t.end();
});

tap.teardown(() => {
	process.exit(0);
});

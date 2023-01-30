import test from 'ava';

import { Skola24 } from './skola24';

test('connect', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const key = await session.getKey();

	t.assert(session.cookies.SessionId);
	t.assert(session.cookies.TS01fb1e5e);
	t.assert(key);
});

test('getClasses', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const classes = await session.getClasses();
	t.assert(classes);
});

test('getSchedule', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const lessons = await session.getSchedule(
		'MDdmYzcyNjctNDI0MS1mY2U2LWI2M2EtNzAxYjZlYmY2NzY2',
		3
	);

	t.assert(lessons);
	t.assert(lessons.lessonInfo);
});

test('getSchoolYear', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const schoolYear = await session.getSchoolYear(session.cookies);

	console.log(schoolYear);
	t.assert(schoolYear);
});

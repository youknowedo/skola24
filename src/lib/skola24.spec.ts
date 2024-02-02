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

	const classes = await session.getClasses();
	const lessons = await session.getSchedule(classes[0].groupGuid, 5);

	t.assert(lessons);
	t.assert(lessons.lessonInfo);
});

test('getSchedule with signature', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const signature = await session.getSignature('2d8hq2pm');
	const lessons = await session.getSchedule(signature, 5);

	t.assert(lessons);
});

test('getSchoolYear', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const schoolYear = await session.getSchoolYear(session.cookies);

	t.assert(schoolYear);
});

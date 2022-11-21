import test from 'ava';

import { Skola24 } from './skola24';

test('connect', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const key = await session.getKey();

	t.assert(session.cookies.SessionId);
	t.assert(session.cookies.TS01fb1e5e);
	console.log(key);
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
		'MTJhNTBiNjktNjhhZS1mMTNhLWEzYjEtNGM2NGZhZmE1ZDhi',
		42
	);

	t.assert(lessons);
});

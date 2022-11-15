import test from 'ava';

import Skola24 from './skola24';

test('connect', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const key = await session.getKey();

	console.log('HostName: ' + session.hostName);
	console.log('UnitGuid: ' + session.unitGuid);
	console.log('SessionId: ' + session.cookies.SessionId);
	console.log('TS01fb1e5e: ' + session.cookies.TS01fb1e5e);
	console.log('Key: ' + key);

	t.assert(session.cookies.SessionId);
	t.assert(session.cookies.TS01fb1e5e);
});

test('getClasses', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const classes = await session.getClasses();

	console.log('Classes:');
	classes?.map((c) => {
		console.log('    ' + c.groupName);
	});

	t.assert(classes);
});

test('getSchedule', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const lessons = await session.getSchedule(
		'MTJhNTBiNjktNjhhZS1mMTNhLWEzYjEtNGM2NGZhZmE1ZDhi'
	);

	console.log('Lessons:');
	lessons?.lessonInfo.map((l) => {
		console.log(
			'    ' +
				l.texts[0] +
				' from ' +
				l.timeStart +
				' to ' +
				l.timeEnd +
				' on ' +
				l.dayOfWeekNumber
		);
	});

	t.assert(lessons);
});

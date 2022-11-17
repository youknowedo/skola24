import test from 'ava';

import Skola24 from './skola24';
import { ParseSchedule } from './utils';

test('Parse schedule', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const schedule = await session.getSchedule(
		'MTJhNTBiNjktNjhhZS1mMTNhLWEzYjEtNGM2NGZhZmE1ZDhi',
		42,
		1
	);
	if (!schedule) {
		t.fail('Could not get schedule');
		return;
	}

	let lessons = ParseSchedule(schedule, 42);
	t.assert(lessons);

	lessons = ParseSchedule(schedule, 42, true);
	t.assert(lessons);
});

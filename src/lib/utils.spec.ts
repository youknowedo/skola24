import test from 'ava';

import { Skola24 } from './skola24';
import {
	GroupLessons,
	ParseLesson,
	ParseSchedule,
	SortSchedule,
} from './utils';

test('Parse schedule', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const schedule = await session.getSchedule(
		'MTJhNTBiNjktNjhhZS1mMTNhLWEzYjEtNGM2NGZhZmE1ZDhi',
		47,
		3
	);
	if (!schedule) {
		t.fail('Could not get schedule');
		return;
	}

	const lesson = ParseLesson(schedule.lessonInfo[0], 42);
	t.assert(lesson);

	let lessons = ParseSchedule(schedule, 47);
	t.assert(lessons);

	lessons = ParseSchedule(schedule, 47, 2022, true);
	t.assert(lessons);

	t.true(lessons[0].to.valueOf() == new Date(2022, 10, 23, 11, 30).valueOf());
});

test('Sort schedule', async (t) => {
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

	lessons = SortSchedule(lessons);

	for (let i = 1; i < lessons.length; i++) {
		t.true(lessons[i].from >= lessons[i - 1].from);
	}
});

test('Group Lessons', async (t) => {
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

	const lessons = ParseSchedule(schedule, 42);

	const groupedLessons = GroupLessons(lessons);
	t.assert(groupedLessons);
});

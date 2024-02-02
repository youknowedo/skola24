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
		'YzBkYWI3MDAtZTNlOC1mZDBmLWFkNjktNzZhMWQzYjJiMjA1',
		3,
		3
	);
	if (!schedule) {
		t.fail('Could not get schedule');
		return;
	}
	console.log('bal', schedule);

	const lesson = ParseLesson(schedule.lessonInfo[0], 5);
	t.assert(lesson);

	let lessons = ParseSchedule(schedule, 5);
	t.assert(lessons);

	lessons = ParseSchedule(schedule, 5, 2023, true);
	t.assert(lessons);
});

test('Sort schedule', async (t) => {
	const session = await Skola24.connect(
		'goteborgstekniskacollege.skola24.se'
	);

	const schedule = await session.getSchedule(
		'YzBkYWI3MDAtZTNlOC1mZDBmLWFkNjktNzZhMWQzYjJiMjA1',
		5,
		1
	);
	if (!schedule) {
		t.fail('Could not get schedule');
		return;
	}

	let lessons = ParseSchedule(schedule, 5);
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
		'YzBkYWI3MDAtZTNlOC1mZDBmLWFkNjktNzZhMWQzYjJiMjA1',
		3,
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

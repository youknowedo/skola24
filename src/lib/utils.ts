import { Lesson, LessonInfo } from './types';
import { ScheduleData } from './types/skola24';

export const ParseLesson = (
	lesson: LessonInfo,
	week: number,
	year = new Date().getFullYear()
): Lesson => {
	const days = week * 7 - (year % 7) + 1 + lesson.dayOfWeekNumber;
	const day = new Date(year, 0, days);

	return {
		id: lesson.guidId,

		name: lesson.texts[0],
		teacher: lesson.texts[1],
		room: lesson.texts[2],

		dayOfWeek: lesson.dayOfWeekNumber,
		from: new Date(
			day.getTime() + Date.parse(`1970-01-01T${lesson.timeStart}.000Z`)
		),
		to: new Date(
			day.getTime() + Date.parse(`1970-01-01T${lesson.timeEnd}.000Z`)
		),
	};
};

export const ParseLessonWithColors = (
	lesson: LessonInfo,
	schedule: ScheduleData,
	week: number,
	year = new Date().getFullYear()
): Lesson => {
	const parsedLesson = ParseLesson(lesson, week, year);

	for (const block of schedule.boxList) {
		if (block.lessonGuids) {
			for (const id of block.lessonGuids) {
				if (id == lesson.guidId) {
					parsedLesson.colors = {
						background: block.bColor,
						text: block.fColor,
					};
				}
			}
		}
	}

	return parsedLesson;
};

export const ParseSchedule = (
	schedule: ScheduleData,
	week: number,
	year = new Date().getFullYear(),
	withColors = false
): Lesson[] => {
	const lessons: Lesson[] = [];

	for (const lesson of schedule.lessonInfo) {
		lessons.push(
			withColors
				? ParseLessonWithColors(lesson, schedule, week)
				: ParseLesson(lesson, week, year)
		);
	}

	return lessons;
};

export const SortSchedule = (schedule: Lesson[]) => {
	let doneSorting = false;
	while (!doneSorting) {
		doneSorting = true;

		for (let i = 1; i < schedule.length; i++) {
			if (schedule[i - 1].from > schedule[i].from) {
				const temp = schedule[i];
				schedule[i] = schedule[i - 1];
				schedule[i - 1] = temp;

				doneSorting = false;
			}
		}
	}

	return schedule;
};

export const GroupLessons = (schedule: (Lesson | undefined)[]): Lesson[][] => {
	const groupedSchedule: Lesson[][] = [];

	for (let i = 0; i < schedule.length; i++) {
		const currentLesson = schedule[i];

		if (currentLesson) {
			const lessonGroup: Lesson[] = [currentLesson];

			for (let j = 0; j < schedule.length; j++) {
				if (i != j) {
					const iteratedLesson = schedule[j];

					if (
						iteratedLesson &&
						iteratedLesson.from >= currentLesson.from &&
						iteratedLesson.from < currentLesson.to
					) {
						lessonGroup.push(iteratedLesson);
						schedule[j] = undefined;
					}
				}
			}

			groupedSchedule.push(lessonGroup);
		}
	}

	return groupedSchedule;
};

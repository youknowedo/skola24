import { Lesson, LessonInfo } from '../types';
import { ScheduleData } from '../types/skola24';

export const ParseLesson = (lesson: LessonInfo, week: number): Lesson => {
	const currentDate = new Date();
	const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

	const days = (week - 1) * 7 + lesson.dayOfWeekNumber;
	const day = new Date(startOfYear.getFullYear(), 0, days);

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
	week: number
): Lesson => {
	const parsedLesson = ParseLesson(lesson, week);

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
	withColors = false
): Lesson[] => {
	const lessons: Lesson[] = [];

	for (const lesson of schedule.lessonInfo) {
		lessons.push(
			withColors
				? ParseLessonWithColors(lesson, schedule, week)
				: ParseLesson(lesson, week)
		);
	}

	return lessons;
};

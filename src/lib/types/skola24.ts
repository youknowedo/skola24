import { BoxList, LessonInfo, LineList, TextList } from './schedule';

export type Skola24Object = {
	id: string | null;
	groupGuid: string;
	groupName: string;
	absenceMessageNotDeliveredCount: number;
	isResponsible: boolean;
	isClass: boolean;
	isAdmin: boolean;
	isPrincipal: boolean;
	isMentor: boolean;
	isPreschoolGroup: boolean;
	teachers: null;
	selectableBy: null;
	substituteTeacherGuid: null;
	teacherChangeStudentsInGroup: number;
};

export type Response<T> = {
	data: T;
};

export type KeyData = {
	key: string;
};

export type ClassesData = {
	classes: Skola24Object[];
};

export type ScheduleData = {
	textList: TextList[];
	boxList: BoxList[];
	lineList: LineList[];
	lessonInfo: LessonInfo[];
};

export type SchoolYear = {
	data: {
		schoolYearStart: Date;
		schoolYearEnd: Date;
	};
};

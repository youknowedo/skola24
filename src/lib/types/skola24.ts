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

export type ScheduleRequestData = {
	renderKey: string;
	host: string;
	unitGuid: string;
	schoolYear: string;
	startDate: any;
	endDate: any;
	scheduleDay: number;
	blackAndWhite: boolean;
	width: number;
	height: number;
	selectionType: number;
	selection: string;
	showHeader: boolean;
	periodText: string;
	week: number;
	year: number;
	privateFreeTextMode: any;
	privateSelectionMode: boolean;
	customerKey: string;
};

export type ScheduleData = {
	textList: TextList[];
	boxList: BoxList[];
	lineList: LineList[];
	lessonInfo: LessonInfo[];
};

export type SchoolYear = {
	error: unknown;
	data: Data;
	exception: unknown;
	validation: unknown[];
	sessionExpires: unknown;
	needSessionRefresh: boolean;
};

export interface Data {
	activeSchoolYears: ActiveSchoolYear[];
	useSchoolYearsFeatures: boolean;
}

export interface ActiveSchoolYear {
	guid: string;
	name: string;
	from: string;
	to: string;
}

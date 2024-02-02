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

export type SignatureData = {
	signature: string;
};

export type ScheduleRequestData = {
	renderKey: string;
	host: string;
	unitGuid: string;
	schoolYear: string;
	startDate: unknown;
	endDate: unknown;
	scheduleDay: number;
	blackAndWhite: boolean;
	width: number;
	height: number;
	selectionType: SelectionType;
	selection: string;
	showHeader: boolean;
	periodText: string;
	week: number;
	year: number;
	privateFreeTextMode: null | false;
	privateSelectionMode: null | false;
	customerKey: string;
};

export enum SelectionType {
	ID = 4,
	ROOM = 3,
	TEACHER = 7,
	CLASS = 0,
}

export type ScheduleData = {
	textList: TextList[];
	boxList: BoxList[];
	lineList: LineList[];
	lessonInfo: LessonInfo[];
};

export interface SchoolYearData {
	activeSchoolYears: ActiveSchoolYear[];
	useSchoolYearsFeatures: boolean;
}

export interface ActiveSchoolYear {
	guid: string;
	name: string;
	from: string;
	to: string;
}

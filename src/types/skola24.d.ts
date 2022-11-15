import { Response as NodeResponse } from 'node-fetch';

type Skola24Object = {
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

export class Response<T> extends NodeResponse {
	public data: T | undefined;
}

type KeyData = {
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

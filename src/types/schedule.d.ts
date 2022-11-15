type TextList = {
	x: number;
	y: number;
	fColor: string;
	fontsize: number;
	text: string;
	bold: boolean;
	italic: boolean;
	id: number;
	parentId: number;
	type: string;
};

type BoxList = {
	x: number;
	y: number;
	width: number;
	height: number;
	bColor: string;
	fColor: string;
	id: number;
	parentId?: number;
	type: string;
	lessonGuids?: string[];
};

type LineList = {
	p1x: number;
	p1y: number;
	p2x: number;
	p2y: number;
	color: string;
	id: number;
	parentId: number;
	type: string;
};

type LessonInfo = {
	guidId: string;
	texts: string[];
	timeStart: string;
	timeEnd: string;
	dayOfWeekNumber: number;
	blockName: string;
};

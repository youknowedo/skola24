export type LColors = {
	background: string;
	text: string;
};

export type Lesson = {
	id: string;
	colors?: LColors;

	name: string;
	teacher: string;
	room: string;

	dayOfWeek: number;
	from: Date;
	to: Date;
};

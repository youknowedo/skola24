export type UnitsData = {
	errors: unknown;
	validationErrors: unknown;
	getTimetableViewerUnitsResponse: GetTimetableViewerUnitsResponse;
};

export type GetTimetableViewerUnitsResponse = {
	hostName: string;
	units: Unit[];
};

export type Unit = {
	unitGuid: string;
	unitId: string;
	allowCalendarExport: boolean;
	private: unknown;
	staff: unknown;
	anonymous: Anonymous;
};

export type Anonymous = {
	students: boolean;
	classes: boolean;
	groups: boolean;
	teachers: boolean;
	rooms: boolean;
	subjects: boolean;
	courses: boolean;
};

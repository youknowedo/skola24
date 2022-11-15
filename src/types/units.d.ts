type UnitsData = {
	errors: unknown;
	validationErrors: unknown;
	getTimetableViewerUnitsResponse: GetTimetableViewerUnitsResponse;
};

type GetTimetableViewerUnitsResponse = {
	hostName: string;
	units: Unit[];
};

type Unit = {
	unitGuid: string;
	unitId: string;
	allowCalendarExport: boolean;
	private: unknown;
	staff: unknown;
	anonymous: Anonymous;
};

type Anonymous = {
	students: boolean;
	classes: boolean;
	groups: boolean;
	teachers: boolean;
	rooms: boolean;
	subjects: boolean;
	courses: boolean;
};

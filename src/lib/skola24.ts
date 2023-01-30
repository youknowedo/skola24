import fetch, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Cookies, getCookies } from './cookies';
import {
	ClassesData,
	KeyData,
	Response,
	ScheduleData,
	SchoolYear,
} from './types/skola24';
import { UnitsData } from './types/units';

export class Skola24 {
	private _hostName: string;
	public get hostName(): string {
		return this._hostName;
	}

	private _unitGuid: string;
	public get unitGuid(): string {
		return this._unitGuid;
	}

	private _cookies: Cookies;
	public get cookies(): Cookies {
		return this._cookies;
	}

	constructor(hostName: string, unitGuid: string, cookies: Cookies) {
		this._hostName = hostName;
		this._unitGuid = unitGuid;
		this._cookies = cookies;
	}

	public static connect = async (
		hostName: string,
		unit = 0
	): Promise<Skola24> => {
		const connectionResponse = await fetch(
			'https://web.skola24.se/timetable/timetable-viewer/'
		);
		const headers = connectionResponse.headers;

		const cookies = getCookies(headers);
		const units = await Skola24.getUnits(hostName, cookies);

		return new Skola24(
			hostName,
			units.getTimetableViewerUnitsResponse.units[unit].unitGuid,
			cookies
		);
	};

	public fetch = async <T, D = unknown>(
		url: string,
		config?: AxiosRequestConfig<D> | undefined
	): Promise<AxiosResponse<T, D>> => {
		return fetch(url, {
			...config,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
				Cookie: `ASP.NET_SessionId=${this._cookies.SessionId}; TS01fb1e5e=${this._cookies.TS01fb1e5e}`,
			},
		});
	};

	public static getUnits = async (
		hostName: string,
		cookies: Cookies
	): Promise<UnitsData> => {
		const response = await fetch<Response<UnitsData>>(
			'https://web.skola24.se/api/services/skola24/get/timetable/viewer/units',
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
					Cookie: `ASP.NET_SessionId=${cookies.SessionId}; TS01fb1e5e=${cookies.TS01fb1e5e}`,
				},
				method: 'POST',
				data: {
					getTimetableViewerUnitsRequest: {
						hostName,
					},
				},
			}
		);

		return response.data.data;
	};

	public getKey = async () => {
		const response = await this.fetch<Response<KeyData>>(
			'https://web.skola24.se/api/get/timetable/render/key'
		);

		return response.data.data.key;
	};

	public getClasses = async () => {
		const response = await this.fetch<Response<ClassesData>>(
			'https://web.skola24.se/api/get/timetable/selection',
			{
				method: 'POST',
				data: {
					hostname: this.hostName,
					unitGuid: this.unitGuid,
					filters: {
						class: true,
						course: false,
						group: false,
						period: false,
						room: false,
						student: false,
						subject: false,
						teacher: false,
					},
				},
			}
		);

		return response.data.data.classes;
	};

	public getSchedule = async (
		selectionGuid: string,
		week: number,
		day: 0 | 1 | 2 | 3 | 4 | 5 = 0,
		year = new Date().getFullYear()
	) => {
		const key = await this.getKey();

		const response = await this.fetch<Response<ScheduleData>>(
			'https://web.skola24.se/api/render/timetable',
			{
				method: 'POST',
				data: {
					renderKey: key,
					host: this.hostName,
					unitGuid: this.unitGuid,
					startDate: null,
					endDate: null,
					blackAndWhite: false,
					width: 365,
					height: 550,
					selectionType: 0,
					selection: selectionGuid,
					showHeader: false,
					periodText: '',
					scheduleDay: day,
					week,
					year,
					privateFreeTextMode: null,
					privateSelectionMode: false,
					customerKey: '',
				},
			}
		);

		return response.data.data;
	};

	public getSchoolYear = async (cookies: Cookies) => {
		const response = await fetch<Response<SchoolYear>>(
			'https://web.skola24.se/api/get/timetable/school/year',
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
					Cookie: `ASP.NET_SessionId=${cookies.SessionId}; TS01fb1e5e=${cookies.TS01fb1e5e}`,
				},
				method: 'POST',
			}
		);

		return response.data.data;
	};
}

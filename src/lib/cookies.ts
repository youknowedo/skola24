import { Headers } from 'node-fetch';

export type Cookies = {
	SessionId: string;
	TS01fb1e5e: string;
};

export const getCookies = (headers: Headers): Cookies => {
	const cookieHeader = headers.get('Set-Cookie');
	if (typeof cookieHeader != 'string')
		throw new Error('Headers does not include a Set-Cookie header');

	const SessionId = getCookieValue(cookieHeader, 'ASP.NET_SessionId');
	const TS01fb1e5e = getCookieValue(cookieHeader, 'TS01fb1e5e');
	return {
		SessionId,
		TS01fb1e5e,
	};
};

export const getCookieValue = (cookieHeader: string, param: string) => {
	const parts = cookieHeader.match(new RegExp(`(^|, )${param}=([^;]+); `));

	if (!parts)
		throw new Error(`Headers did not include a Set-Cookie for "${param}"`);

	return parts[2].toString();
};

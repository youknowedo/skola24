import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

export type Cookies = {
	SessionId: string;
	TS01fb1e5e: string;
};

export const getCookies = (
	headers: RawAxiosResponseHeaders | AxiosResponseHeaders
): Cookies => {
	const cookieHeader = headers['set-cookie'];
	if (!cookieHeader || typeof cookieHeader[0] != 'string')
		throw new Error(
			'Headers does not include a Set-Cookie header' +
				JSON.stringify(headers)
		);

	const SessionId = getCookieValue(cookieHeader, 'ASP.NET_SessionId');
	const TS01fb1e5e = getCookieValue(cookieHeader, 'TS01fb1e5e');
	return {
		SessionId,
		TS01fb1e5e,
	};
};

export const getCookieValue = (cookieHeader: string[], param: string) => {
	const parts = cookieHeader
		.join(',')
		.match(new RegExp(`(^|,)${param}=([^;]+);`));

	if (!parts)
		throw new Error(
			`Headers did not include a Set-Cookie for "${param}"  "${cookieHeader.join(
				'; '
			)}"`
		);

	return parts[2].toString();
};

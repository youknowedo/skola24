import test from 'ava';
import { Headers } from 'node-fetch';

import { getCookies, getCookieValue } from './cookies';

const headers = new Headers();

test('get cookies from empty header', async (t) => {
	t.throws(() => getCookies(headers));
});

test('get cookie value from empty cookie header', async (t) => {
	t.throws(() => getCookieValue('', 'cookie'));
});

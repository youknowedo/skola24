import test from 'ava';

import { getCookies, getCookieValue } from './cookies';

test('get cookies from empty header', async (t) => {
	t.throws(() => getCookies({}));
});

test('get cookie value from empty cookie header', async (t) => {
	t.throws(() => getCookieValue([''], 'cookie'));
});

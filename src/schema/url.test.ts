import {
	itShouldNotParse,
	itShouldParse,
	itShouldParseAs,
} from '../testing/zod.js';
import {
	AbsoluteUrlSchema,
	DomainNameSchema,
	RelativeUrlSchema,
	normalizeUrl,
} from './url.js';
import { describe, expect, it } from '@jest/globals';

describe('DomainNameSchema', () => {
	itShouldParse('a valid domain name', DomainNameSchema, 'example.com');
	itShouldParse('a valid subdomain', DomainNameSchema, 'subdomain.example.com');

	itShouldParseAs(
		'a capitalized domain name',
		DomainNameSchema,
		'EXAMPLE.COM',
		'example.com',
	);
	itShouldParseAs(
		'a domain name with a trailing period',
		DomainNameSchema,
		'example.com.',
		'example.com',
	);

	itShouldNotParse('an empty string', DomainNameSchema, '');
	itShouldNotParse('a full URL', DomainNameSchema, 'https://example.com/');
	itShouldNotParse('an invalid domain name', DomainNameSchema, 'foo+bar.com');
	itShouldNotParse('a top-level domain', DomainNameSchema, 'com');
	itShouldNotParse(
		'a domain name with a Unicode character',
		DomainNameSchema,
		'😊.com',
	);
});

describe('AbsoluteUrlSchema', () => {
	itShouldParse('a valid URL', AbsoluteUrlSchema, 'https://example.com/');

	itShouldParseAs(
		'a valid URL with a capitalized domain name',
		AbsoluteUrlSchema,
		'https://EXAMPLE.COM/',
		'https://example.com/',
	);
	itShouldParseAs(
		'a valid URL with a trailing period',
		AbsoluteUrlSchema,
		'https://example.com.',
		'https://example.com/',
	);

	itShouldNotParse('a number', AbsoluteUrlSchema, 1);
	itShouldNotParse('an empty string', AbsoluteUrlSchema, '');
	itShouldNotParse('a domain name', AbsoluteUrlSchema, 'example.com');
	itShouldNotParse('a relative URL', AbsoluteUrlSchema, '/foo');
	itShouldNotParse(
		'a URI that is not a URL',
		AbsoluteUrlSchema,
		'ftp://example.com/',
	);
	itShouldNotParse('an invalid URL', AbsoluteUrlSchema, 'https://foo+bar.com/');
	itShouldNotParse(
		'a URL to a top-level domain',
		AbsoluteUrlSchema,
		'https://com/',
	);
});

describe('RelativeUrlSchema', () => {
	itShouldParse('a valid relative URL', RelativeUrlSchema, '/example');
	itShouldParse(
		'a relative URL with a query string',
		RelativeUrlSchema,
		'/example?v=2',
	);
	itShouldParse(
		'a relative URL with URI-encoded characters',
		RelativeUrlSchema,
		'/foo%20bar',
	);

	itShouldParseAs(
		'a relative URL with characters to URI-encoded',
		RelativeUrlSchema,
		'/foo bar',
		'/foo%20bar',
	);

	itShouldNotParse('an empty string', RelativeUrlSchema, '');
	itShouldNotParse('an invalid relative URL', RelativeUrlSchema, 'example');
});

describe('normalizeUrl', () => {
	it('should append a relative URL to the domain name', () => {
		expect(normalizeUrl('/about', 'example.com')).toBe(
			'https://example.com/about',
		);
	});

	it('should return an absolute URL as is', () => {
		expect(normalizeUrl('https://foo.com/example', 'bar.com')).toBe(
			'https://foo.com/example',
		);
	});
});

import {
	AbsoluteUrlSchema,
	DomainNameSchema,
	RelativeUrlSchema,
	normalizeUrl,
} from '../../schema/url.js';
import { describeSchema } from '../utils.js';
import { describe, expect, it } from '@jest/globals';

describeSchema(DomainNameSchema, 'DomainNameSchema', {
	validValues: ['example.com', 'foo.example.com'],
	normalizableValues: [
		['EXAMPLE.COM', 'example.com'],
		['example.com.', 'example.com'],
	],
	invalidValues: ['foo', 'https://example.com/', '😊.com'],
});

describeSchema(AbsoluteUrlSchema, 'AbsoluteUrlSchema', {
	validValues: [
		'https://example.com/',
		'http://example.com/',
		'https://example.com/foo%20bar',
		'https://example.com/foo?v=1',
	],
	normalizableValues: [
		['https://example.com', 'https://example.com/'],
		['https://EXAMPLE.COM/', 'https://example.com/'],
		['https://example.com.', 'https://example.com/'],
		['https://example.com/foo bar', 'https://example.com/foo%20bar'],
	],
	invalidValues: ['ftp://example.com/', 'example.com', '/foo'],
});

describeSchema(RelativeUrlSchema, 'RelativeUrlSchema', {
	validValues: ['/', '/foo', '/foo%20bar'],
	normalizableValues: [['/foo bar', '/foo%20bar']],
	invalidValues: ['foo'],
});

describe('normalizeUrl', () => {
	it('should leave a normalized full URL as is', () => {
		expect(normalizeUrl('https://foo.com/', 'bar.com')).toBe(
			'https://foo.com/',
		);
	});

	it('should resolve a relative URL', () => {
		expect(normalizeUrl('/foo', 'bar.com')).toBe('https://bar.com/foo');
	});
});

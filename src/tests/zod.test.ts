import { formatZodPath } from '../zod.js';
import { describe, expect, it } from '@jest/globals';

describe('formatZodPath', () => {
	it('should format an empty array', () => {
		expect(formatZodPath('foo', [])).toBe('foo');
	});

	it('should format an array of strings', () => {
		expect(formatZodPath('foo', ['bar', 'baz'])).toBe('foo.bar.baz');
	});

	it('should format an array of numbers', () => {
		expect(formatZodPath('foo', [0, 1])).toBe('foo[0][1]');
	});

	it('should format an array of strings and numbers', () => {
		expect(formatZodPath('foo', ['bar', 1, 'baz', 2])).toBe(
			'foo.bar[1].baz[2]',
		);
	});
});

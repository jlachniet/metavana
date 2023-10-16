import { formatZodPath, isDotNotationKey } from './zod.js';
import { describe, expect, it } from '@jest/globals';

describe('isDotNotationKey', () => {
	it('should return true for a valid key', () => {
		expect(isDotNotationKey('foo')).toBe(true);
	});

	it('should return false for an invalid key', () => {
		expect(isDotNotationKey('foo-bar')).toBe(false);
	});
});

describe('formatZodPath', () => {
	it('should return the top-level key if the path is empty', () => {
		expect(formatZodPath('foo', [])).toBe('foo');
	});

	it('should handle dot notation keys', () => {
		expect(formatZodPath('foo', ['bar'])).toBe('foo.bar');
	});

	it('should handle bracket notation keys', () => {
		expect(formatZodPath('foo', ['b-a-r'])).toBe('foo["b-a-r"]');
	});

	it('should handle numeric keys', () => {
		expect(formatZodPath('foo', [0])).toBe('foo[0]');
	});

	it('should handle multiple key types', () => {
		expect(formatZodPath('foo', ['bar', 0, 'q-u-x'])).toBe(
			'foo.bar[0]["q-u-x"]',
		);
	});
});

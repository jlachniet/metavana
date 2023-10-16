import {
	itShouldNotParse,
	itShouldParse,
	itShouldParseAs,
} from '../testing/zod.js';
import { NormalizedStringSchema } from './strings.js';
import { describe } from '@jest/globals';

describe('NormalizedStringSchema', () => {
	itShouldParse('a normalized string', NormalizedStringSchema, 'Example');

	itShouldParseAs(
		'a string with leading and trailing whitespace',
		NormalizedStringSchema,
		' Example ',
		'Example',
	);

	itShouldNotParse('an empty string', NormalizedStringSchema, '');
	itShouldNotParse(
		'a string with only whitespace',
		NormalizedStringSchema,
		' ',
	);
});

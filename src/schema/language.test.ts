import {
	itShouldNotParse,
	itShouldParse,
	itShouldParseAs,
} from '../testing/zod.js';
import { LanguageTagSchema, TextDirectionSchema } from './language.js';
import { describe } from '@jest/globals';

describe('LanguageSchema', () => {
	itShouldParse('a simple language tag', LanguageTagSchema, 'en');
	itShouldParse('a language tag with a region', LanguageTagSchema, 'en-US');
	itShouldParse(
		'a complex language tag',
		LanguageTagSchema,
		'hy-Latn-IT-arevela',
	);

	itShouldParseAs(
		'a legacy language tag',
		LanguageTagSchema,
		'i-klingon',
		'tlh',
	);

	itShouldNotParse('an empty string', LanguageTagSchema, '');
	itShouldNotParse('an invalid language tag', LanguageTagSchema, 'en+US');
});

describe('TextDirectionSchema', () => {
	itShouldParse('ltr', TextDirectionSchema, 'ltr');
	itShouldParse('rtl', TextDirectionSchema, 'rtl');
	itShouldParse('auto', TextDirectionSchema, 'auto');

	itShouldNotParse('an empty string', TextDirectionSchema, '');
	itShouldNotParse('an invalid text direction', TextDirectionSchema, 'ltl');
});

import {
	LanguageTagSchema,
	TextDirectionSchema,
} from '../../schema/language.js';
import { describeSchema } from '../utils.js';

describeSchema(LanguageTagSchema, 'LanguageTagSchema', {
	validValues: ['en', 'en-US', 'hy-Latn-IT-arevela'],
	normalizableValues: [['i-klingon', 'tlh']],
	invalidValues: ['', 'en-', '-en', 'en"US'],
});

describeSchema(TextDirectionSchema, 'TextDirectionSchema', {
	validValues: ['ltr', 'rtl', 'auto'],
	invalidValues: ['ltl'],
});

import { describeObjectSchema } from '../testing/zod.js';
import { SharedSchema } from './shared.js';

describeObjectSchema(
	SharedSchema,
	'SharedSchema',
	{},
	{
		languageTag: 'en',
		textDirection: 'ltr',
		authors: [],
		description: 'The site or page description.',
	},
	null,
	true,
);

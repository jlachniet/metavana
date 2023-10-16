import { describeObjectSchema } from '../testing/zod.js';
import { AuthorSchema } from './author.js';

describeObjectSchema(
	AuthorSchema,
	'AuthorSchema',
	{
		name: 'John Doe',
	},
	{
		url: '/john-doe',
	},
);

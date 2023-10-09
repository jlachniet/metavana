import { AuthorSchema } from '../../schema/author.js';
import { describeObjectSchema } from '../utils.js';

describeObjectSchema(
	AuthorSchema,
	'AuthorSchema',
	{
		name: 'John Doe',
	},
	{
		url: '/',
	},
);

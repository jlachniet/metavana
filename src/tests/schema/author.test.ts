import { AuthorSchema } from '../../schema/author.js';
import { describeObjectSchema } from '../_utils.js';

describeObjectSchema(
	AuthorSchema,
	'AuthorSchema',
	{
		name: 'John Doe',
	},
	{},
);

import { PageSchema } from '../../schema/page.js';
import { describeObjectSchema, describeSchema } from '../utils.js';

describeObjectSchema(
	PageSchema,
	'PageSchema',
	{
		url: '/',
	},
	{
		isHomePage: true,
	},
);

describeSchema(PageSchema, 'PageSchema', {
	normalizableValues: [
		[
			{
				url: '/',
			},
			{
				url: '/',
				isHomePage: true,
			},
		],
		[
			{
				url: '/example',
				name: 'Example',
			},
			{
				url: '/example',
				name: 'Example',
				isHomePage: false,
			},
		],
		[
			{
				url: '/',
			},
			{
				url: '/',
				isHomePage: true,
			},
		],
	],
	invalidValues: [
		{
			url: '/example',
		},
	],
});

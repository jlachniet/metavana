import { PageSchema } from '../../schema/page.js';
import { describeObjectSchema, describeSchema } from '../utils.js';

describeObjectSchema(
	PageSchema,
	'PageSchema',
	{
		url: '/',
	},
	{
		name: 'Home',
		isHomePage: true,
		languageTag: 'en-US',
		textDirection: 'ltr',
		description: 'A description',
		authors: [],
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
				authors: [],
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
				authors: [],
			},
		],
		[
			{
				url: '/',
			},
			{
				url: '/',
				isHomePage: true,
				authors: [],
			},
		],
	],
	invalidValues: [
		{
			url: '/example',
		},
	],
});

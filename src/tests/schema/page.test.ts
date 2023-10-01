import { PageSchema } from '../../schema/page.js';
import { describeObjectSchema, describeSchema } from '../_utils.js';

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

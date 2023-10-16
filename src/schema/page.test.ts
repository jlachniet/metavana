import {
	describeObjectSchema,
	itShouldNotParse,
	itShouldParseAs,
} from '../testing/zod.js';
import { PageSchema } from './page.js';

describeObjectSchema(
	PageSchema,
	'PageSchema',
	{
		url: '/',
	},
	{
		name: 'Home',
		isHomePage: true,
		overrideTitle: 'Home',
		languageTag: 'en',
		textDirection: 'ltr',
		authors: [],
		description: 'The home page.',
	},
	() => {
		itShouldParseAs(
			'a page with a URL of / by setting isHomePage to true',
			PageSchema,
			{ url: '/' },
			{ url: '/', isHomePage: true, authors: [] },
		);
		itShouldParseAs(
			'a page with a URL of /example by setting isHomePage to false',
			PageSchema,
			{ url: '/example', name: 'Example Page' },
			{ url: '/example', name: 'Example Page', isHomePage: false, authors: [] },
		);

		itShouldNotParse(
			'a page with a URL of /example without a name',
			PageSchema,
			{
				url: '/example',
			},
		);
	},
);

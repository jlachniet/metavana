import { SiteSchema } from '../../schema/site.js';
import { describeObjectSchema, describeSchema } from '../utils.js';

describeObjectSchema(
	SiteSchema,
	'SiteSchema',
	{
		name: 'Example Domain',
		domainName: 'example.com',
	},
	{
		titleFormat: 'PAGE_NAME - SITE_NAME',
		languageTag: 'en-US',
		textDirection: 'ltr',
		description: 'A description',
		authors: [],
		i18n: {},
	},
);

describeSchema(SiteSchema, 'SiteSchema', {
	normalizableValues: [
		[
			{
				name: 'Hello',
				domainName: 'example.com',
				languageTag: 'en',
				i18n: {
					nameTranslations: {
						es: 'Hola',
					},
				},
			},
			{
				name: 'Hello',
				domainName: 'example.com',
				titleFormat: 'PAGE_NAME - SITE_NAME',
				languageTag: 'en',
				authors: [],
				i18n: {
					nameTranslations: {
						es: 'Hola',
					},
				},
			},
		],
	],
	invalidValues: [
		{
			name: 'Hello',
			domainName: 'example.com',
			i18n: {
				nameTranslations: {
					es: 'Hola',
				},
			},
		},
		{
			name: 'Hello',
			domainName: 'example.com',
			languageTag: 'en',
			i18n: {
				nameTranslations: {
					en: 'Hello',
					es: 'Hola',
				},
			},
		},
	],
});

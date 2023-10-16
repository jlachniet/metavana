import { describeObjectSchema, itShouldNotParse } from '../testing/zod.js';
import { SiteSchema } from './site.js';
import { SiteI18nSchema } from './sitei18n.js';

describeObjectSchema(
	SiteSchema,
	'SiteSchema',
	{
		name: 'Example Site',
		domainName: 'example.com',
	},
	{
		titleFormat: 'PAGE_NAME - SITE_NAME',
		languageTag: 'en',
		textDirection: 'ltr',
		authors: [],
		description: 'The site.',
		isWebApp: true,
		i18n: SiteI18nSchema.parse({}),
	},
	() => {
		itShouldNotParse(
			'a site with name translations but no language tag',
			SiteSchema,
			{
				name: 'Example Site',
				domainName: 'example.com',
				i18n: {
					nameTranslations: {
						en: 'Example Site',
					},
				},
			},
		);
		itShouldNotParse(
			'a site with a name translation for the primary language tag',
			SiteSchema,
			{
				name: 'Example Site',
				domainName: 'example.com',
				languageTag: 'en',
				i18n: {
					nameTranslations: {
						en: 'Example Site',
					},
				},
			},
		);
	},
);

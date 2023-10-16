import { describeObjectSchema } from '../testing/zod.js';
import { SiteI18nSchema } from './sitei18n.js';

describeObjectSchema(
	SiteI18nSchema,
	'SiteI18nSchema',
	{},
	{
		nameTranslations: {
			en: 'Hello',
			es: 'Hola',
			fr: 'Bonjour',
		},
	},
);

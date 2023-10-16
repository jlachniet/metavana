import { SharedSchema } from './shared.js';
import { SiteI18nSchema } from './sitei18n.js';
import { NormalizedStringSchema } from './strings.js';
import { DomainNameSchema } from './url.js';
import { z } from 'zod';

/**
 * The properties of a site.
 */
export type Site = z.infer<typeof SiteSchema>;
export const SiteSchema = z
	.object({
		/**
		 * The name.
		 */
		name: NormalizedStringSchema,
		/**
		 * The domain name.
		 */
		domainName: DomainNameSchema,
		/**
		 * The title format.
		 */
		titleFormat: NormalizedStringSchema.default('PAGE_NAME - SITE_NAME'),
		/**
		 * Whether the site is a web app.
		 */
		isWebApp: z.boolean().default(true),
		/**
		 * The internationalization options.
		 */
		i18n: SiteI18nSchema.default({}),
	})
	.merge(SharedSchema)
	.strict()
	.refine(
		site =>
			Object.keys(site.i18n.nameTranslations).length === 0 ||
			site.languageTag !== undefined,
		{
			message:
				'Site name translations cannot be set if the primary language tag is not set',
			path: ['i18n', 'nameTranslations'],
		},
	)
	.refine(
		site =>
			!site.languageTag ||
			!Object.keys(site.i18n.nameTranslations).includes(site.languageTag),
		{
			message:
				'The primary language tag cannot be included in the name translations',
			path: ['i18n', 'nameTranslations'],
		},
	);

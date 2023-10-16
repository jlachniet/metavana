import { LanguageTagSchema } from './language.js';
import { NormalizedStringSchema } from './strings.js';
import { z } from 'zod';

/**
 * The internationalization properties of a site.
 */
export const SiteI18nSchema = z
	.object({
		/**
		 * The name translations.
		 */
		nameTranslations: z
			.record(LanguageTagSchema, NormalizedStringSchema)
			.default({}),
	})
	.strict();

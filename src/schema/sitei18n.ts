import { LanguageTagSchema } from './language.js';
import { z } from 'zod';

export const SiteI18nSchema = z
	.object({
		/**
		 * The name translations.
		 */
		nameTranslations: z
			.record(LanguageTagSchema, z.string().min(1))
			.default({}),
	})
	.strict();

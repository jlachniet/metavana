import { LanguageTagSchema } from './language.js';
import { z } from 'zod';

export const SiteI18nSchema = z
	.object({
		nameTranslations: z
			.record(LanguageTagSchema, z.string().min(1))
			.default({}),
	})
	.strict();

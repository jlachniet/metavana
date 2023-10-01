import { LanguageTagSchema, TextDirectionSchema } from './language.js';
import { z } from 'zod';

/**
 * The properties shared by both a site and a page.
 */
export const SharedSchema = z.object({
	/**
	 * The language tag.
	 */
	languageTag: LanguageTagSchema.optional(),
	/**
	 * The text direction.
	 */
	textDirection: TextDirectionSchema.optional(),
});

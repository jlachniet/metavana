import { AuthorSchema } from './author.js';
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
	/**
	 * The authors.
	 */
	authors: AuthorSchema.array().default([]),
	/**
	 * The description.
	 */
	description: z.string().min(1).optional(),
});

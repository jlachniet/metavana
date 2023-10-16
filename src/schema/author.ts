import { NormalizedStringSchema } from './strings.js';
import { UrlSchema } from './url.js';
import { z } from 'zod';

/**
 * An author.
 */
export const AuthorSchema = z
	.object({
		/**
		 * The name.
		 */
		name: NormalizedStringSchema,
		/**
		 * The URL.
		 */
		url: UrlSchema.optional(),
	})
	.strict();

import { AbsoluteUrlSchema, RelativeUrlSchema } from './url.js';
import { z } from 'zod';

/**
 * An author.
 */
export const AuthorSchema = z
	.object({
		/**
		 * The name.
		 */
		name: z.string().min(1),
		/**
		 * The URL.
		 */
		url: z.union([AbsoluteUrlSchema, RelativeUrlSchema]).optional(),
	})
	.strict();

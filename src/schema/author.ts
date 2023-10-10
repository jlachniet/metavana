import { AbsoluteUrlSchema, RelativeUrlSchema } from './url.js';
import { z } from 'zod';

/**
 * An author.
 */
export const AuthorSchema = z
	.object({
		name: z.string().min(1),
		url: z.union([AbsoluteUrlSchema, RelativeUrlSchema]).optional(),
	})
	.strict();

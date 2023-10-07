import { z } from 'zod';

/**
 * An author.
 */
export const AuthorSchema = z
	.object({
		name: z.string().min(1),
	})
	.strict();

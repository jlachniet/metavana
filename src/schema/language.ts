import { parse, stringify } from 'bcp-47';
import { z } from 'zod';

/**
 * A language tag.
 */
export const LanguageTagSchema = z
	.string()
	.transform(value => stringify(parse(value, { normalize: true })))
	.refine(value => value !== '', { message: 'Invalid language tag' });

/**
 * A text direction.
 */
export type TextDirection = z.infer<typeof TextDirectionSchema>;
export const TextDirectionSchema = z.enum(['ltr', 'rtl', 'auto']);

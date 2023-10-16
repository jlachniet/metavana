import { z } from 'zod';

/**
 * A string with a minimum length of 1.
 * @remarks Normalized by being trimmed.
 */
export const NormalizedStringSchema = z.string().trim().min(1);

import { SharedSchema } from './shared.js';
import { NormalizedStringSchema } from './strings.js';
import { RelativeUrlSchema } from './url.js';
import { z } from 'zod';

/**
 * The properties of a page.
 */
export type Page = z.infer<typeof PageSchema>;
export const PageSchema = z
	.object({
		/**
		 * The relative URL.
		 */
		url: RelativeUrlSchema,
		/**
		 * The name.
		 */
		name: NormalizedStringSchema.optional(),
		/**
		 * Whether it is the home page.
		 */
		isHomePage: z.boolean().optional(),
		/**
		 * A title to override the default title with.
		 */
		overrideTitle: NormalizedStringSchema.optional(),
	})
	.merge(SharedSchema)
	.strict()
	.transform(page => ({
		...page,
		isHomePage: page.isHomePage ?? page.url === '/',
	}))
	.refine(page => page.isHomePage || page.name, {
		message: 'Page name must be set if it page is not the home page',
		path: ['name'],
	});

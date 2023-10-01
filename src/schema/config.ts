import { PageSchema } from './page.js';
import { SiteSchema } from './site.js';
import { z } from 'zod';

/**
 * A configuration object.
 */
export type Config = z.infer<typeof ConfigSchema>;
export const ConfigSchema = z
	.object({
		/**
		 * The properties of the site.
		 */
		site: SiteSchema,
		/**
		 * The properties of the pages.
		 */
		pages: PageSchema.array().nonempty(),
	})
	.strict()
	.refine(
		config => {
			const pageNames = config.pages.map(page => page.name);
			const uniquePageNames = new Set(pageNames);

			return pageNames.length === uniquePageNames.size;
		},
		{ message: 'Page names must be unique', path: ['pages'] },
	);

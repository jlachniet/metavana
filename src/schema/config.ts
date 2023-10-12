import { generatePath } from '../generation/path.js';
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
			const pagePaths = config.pages.map(generatePath);
			const uniquePagePaths = new Set(pagePaths);

			return pagePaths.length === uniquePagePaths.size;
		},
		{ message: 'Page paths must be unique', path: ['pages'] },
	);

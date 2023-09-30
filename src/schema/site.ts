import { DomainNameSchema } from './url.js';
import { z } from 'zod';

/**
 * The properties of a site.
 */
export type Site = z.infer<typeof SiteSchema>;
export const SiteSchema = z
	.object({
		/**
		 * The name.
		 */
		name: z.string().nonempty(),
		/**
		 * The domain name.
		 */
		domainName: DomainNameSchema,
		/**
		 * The title format.
		 */
		titleFormat: z.string().nonempty().default('PAGE_NAME - SITE_NAME'),
	})
	.strict();

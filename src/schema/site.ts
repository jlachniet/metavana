import { SharedSchema } from './shared.js';
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
		name: z.string().min(1),
		/**
		 * The domain name.
		 */
		domainName: DomainNameSchema,
		/**
		 * The title format.
		 */
		titleFormat: z.string().min(1).default('PAGE_NAME - SITE_NAME'),
	})
	.merge(SharedSchema)
	.strict();

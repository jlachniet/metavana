import { METAVANA_VERSION } from '../env.js';
import { Page } from '../schema/page.js';
import { Site } from '../schema/site.js';

/**
 * A meta tag.
 */
interface MetaTag {
	/**
	 * The name.
	 */
	name: string;
	/**
	 * The content.
	 */
	content: string;
}

/**
 * Generates the meta tags for a page.
 * @param site - The site
 * @param page - The page
 * @returns The meta tags
 */
/* istanbul ignore next */
export function generateMetaTags(site: Site, page: Page) {
	const description = page.description ?? site.description;

	const metaTags: MetaTag[] = [
		{ name: 'application-name', content: site.name },
		{ name: 'generator', content: `metavana ${METAVANA_VERSION}` },
		{ name: 'viewport', content: 'width=device-width,initial-scale=1' },
	];

	if (description) {
		metaTags.push({ name: 'description', content: description });
	}

	return metaTags;
}

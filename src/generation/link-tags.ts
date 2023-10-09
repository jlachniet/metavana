import { Page } from '../schema/page.js';
import { Site } from '../schema/site.js';
import { normalizeUrl } from '../schema/url.js';

/**
 * A link tag.
 */
interface LinkTag {
	/**
	 * The relationship.
	 */
	rel: string;
	/**
	 * The URL.
	 */
	href: string;
}

/**
 * Generates the link tags for a page.
 * @param site - The site
 * @param page - The page
 * @returns The link tags
 */
export function generateLinkTags(site: Site, page: Page) {
	const authors = page.authors.length > 0 ? page.authors : site.authors;

	const linkTags: LinkTag[] = [
		{
			rel: 'canonical',
			href: `https://${site.domainName}${page.url}`,
		},
	];

	for (const author of authors) {
		if (author.url) {
			linkTags.push({
				rel: 'author',
				href: normalizeUrl(author.url, site.domainName),
			});
		}
	}

	return linkTags.sort((a, b) => a.rel.localeCompare(b.rel));
}

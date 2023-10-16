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
	/**
	 * The language tag.
	 */
	lang?: string;
}

/**
 * Generates the meta tags for a page.
 * @param site - The site
 * @param page - The page
 * @returns The meta tags
 */
export function generateMetaTags(site: Site, page: Page) {
	const authors = page.authors.length > 0 ? page.authors : site.authors;
	const description = page.description ?? site.description;

	const metaTags: MetaTag[] = [
		{ name: 'generator', content: `metavana ${METAVANA_VERSION}` },
		{ name: 'viewport', content: 'width=device-width,initial-scale=1' },
	];

	if (site.isWebApp) {
		if (
			site.languageTag &&
			Object.keys(site.i18n.nameTranslations).length > 0
		) {
			metaTags.push({
				name: 'application-name',
				content: site.name,
				lang: site.languageTag,
			});

			for (const [languageTag, nameTranslation] of Object.entries(
				site.i18n.nameTranslations,
			).sort(([a], [b]) => a.localeCompare(b))) {
				metaTags.push({
					name: 'application-name',
					content: nameTranslation,
					lang: languageTag,
				});
			}
		} else {
			metaTags.push({ name: 'application-name', content: site.name });
		}
	}

	for (const author of authors) {
		metaTags.push({ name: 'author', content: author.name });
	}

	if (description) {
		metaTags.push({ name: 'description', content: description });
	}

	return metaTags.sort();
}

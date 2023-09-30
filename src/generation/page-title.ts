import { Page } from '../schema/page.js';
import { Site } from '../schema/site.js';

/**
 * Generates the title for a page.
 * @param site - The site
 * @param page - The page
 * @returns The title
 */
export function generatePageTitle(site: Site, page: Page) {
	const pageName = page.name;

	if (page.overrideTitle) {
		return page.overrideTitle;
	}

	if (!pageName) {
		return site.name;
	}

	return site.titleFormat.replace(/(SITE_NAME|PAGE_NAME)/g, match => {
		if (match === 'SITE_NAME') {
			return site.name;
		} else {
			return pageName;
		}
	});
}

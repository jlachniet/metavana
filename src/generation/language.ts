import { TextDirection } from '../schema/language.js';
import { Page } from '../schema/page.js';
import { Site } from '../schema/site.js';

/**
 * Generates the language tag for a page.
 * @param site - The site
 * @param page - The page
 * @returns The language tag
 */
export function generateLanguageTag(site: Site, page: Page) {
	return page.languageTag ?? site.languageTag;
}

/**
 * Generates the text direction for a page.
 * @param site - The site
 * @param page - The page
 * @returns The text direction
 */
export function generateTextDirection(site: Site, page: Page): TextDirection {
	return page.textDirection ?? site.textDirection ?? 'auto';
}

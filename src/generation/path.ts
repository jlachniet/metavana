import { Page } from '../schema/page.js';

/**
 * Generates the path for a page.
 * @param page - The page
 * @returns The path
 */
export function generatePath(page: Page) {
	return page.url.endsWith('/')
		? `${page.url.split('?')[0]}index.html`
		: `${page.url.split('?')[0]}.html`;
}

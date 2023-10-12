import { Page } from '../schema/page.js';

/**
 * An output path.
 */
type OutputPath = `${string}.html`;

/**
 * Generates the output path for a page.
 * @param page - The page
 * @returns The path
 */
export function generatePath(page: Page): OutputPath {
	return page.url.endsWith('/')
		? `${page.url.split('?')[0]}index.html`
		: `${page.url.split('?')[0]}.html`;
}

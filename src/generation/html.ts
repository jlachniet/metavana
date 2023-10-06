import { Page } from '../schema/page.js';
import { Site } from '../schema/site.js';
import { generateMetaTags } from './meta-tags.js';
import { generatePageTitle } from './page-title.js';

/**
 * Generates the HTML for a page.
 * @param site - The site
 * @param page - The page
 * @returns The HTML
 */
export function generateHtml(site: Site, page: Page) {
	const languageTag = page.languageTag ?? site.languageTag;
	const textDirection = page.textDirection ?? site.textDirection;
	const title = generatePageTitle(site, page);

	const metaTags = generateMetaTags(site, page);

	return `<!doctype html>
<html${languageTag ? ` lang="${languageTag}"` : ''}${
		textDirection === 'ltr' || textDirection === 'rtl'
			? ` dir="${textDirection}"`
			: ''
	}>
	<head>
		<meta charset="utf-8" />
		<title>${escapeHtml(title, 'html')}</title>

${metaTags
	.map(
		metaTag =>
			`		<meta name="${escapeHtml(
				metaTag.name,
				'attribute',
			)}" content="${escapeHtml(metaTag.content, 'attribute')}" />`,
	)
	.join('\n')}

		<link rel="canonical" href="https://${site.domainName}${page.url}" />
	</head>
	<body></body>
</html>
`;
}

/**
 * A mode for escaping HTML.
 */
type HtmlEscapeMode = 'html' | 'attribute';

/**
 * Escapes a string for use in HTML.
 * @param string - The string
 * @param escapeMode - The mode
 * @returns The escaped string
 */
export function escapeHtml(string: string, escapeMode: HtmlEscapeMode) {
	if (escapeMode === 'html') {
		return string
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;');
	} else {
		return string.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
	}
}

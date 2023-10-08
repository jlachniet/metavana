import { Page } from '../schema/page.js';
import { Site } from '../schema/site.js';
import { generateLanguageTag, generateTextDirection } from './language.js';
import { generateLinkTags } from './link-tags.js';
import { generateMetaTags } from './meta-tags.js';
import { generatePageTitle } from './page-title.js';

/**
 * Generates the HTML for a page.
 * @param site - The site
 * @param page - The page
 * @returns The HTML
 */
export function generateHtml(site: Site, page: Page) {
	const languageTag = generateLanguageTag(site, page);
	const textDirection = generateTextDirection(site, page);
	const title = generatePageTitle(site, page);

	const metaTags = generateMetaTags(site, page);
	const linkTags = generateLinkTags(site, page);

	return `<!doctype html>
<html${languageTag ? ` lang="${languageTag}"` : ''}${
		textDirection !== 'auto' ? ` dir="${textDirection}"` : ''
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
			)}" content="${escapeHtml(metaTag.content, 'attribute')}"${
				metaTag.lang ? ` lang="${escapeHtml(metaTag.lang, 'attribute')}"` : ''
			} />`,
	)
	.join('\n')}

${linkTags
	.map(
		linkTag =>
			`		<link rel="${escapeHtml(linkTag.rel, 'attribute')}" href="${escapeHtml(
				linkTag.href,
				'attribute',
			)}" />`,
	)
	.join('\n')}
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

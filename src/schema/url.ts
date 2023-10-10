import isValidDomain from 'is-valid-domain';
import { z } from 'zod';

/**
 * A domain name.
 * @remarks Normalized by being converted to lowercase and having a trailing
 * period removed if present.
 * @example "example.com"
 */
export const DomainNameSchema = z
	.custom<`${string}.${string}`>(
		domainName =>
			typeof domainName === 'string' &&
			isValidDomain(domainName, { subdomain: true }),
		{ message: 'Invalid domain name' },
	)
	.transform(
		domainName =>
			(domainName.endsWith('.')
				? domainName.toLowerCase().slice(0, -1)
				: domainName.toLowerCase()) as `${string}.${string}`,
	);
type DomainName = z.infer<typeof DomainNameSchema>;

/**
 * An absolute URL.
 * @remarks Normalized by the URL class.
 * @example "https://example.com/about"
 */
export const AbsoluteUrlSchema = z
	.custom<`https://${DomainName}${string}` | `http://${DomainName}${string}`>(
		url => {
			if (typeof url !== 'string') {
				return false;
			}

			try {
				const urlObject = new URL(url);
				return ['https:', 'http:'].includes(urlObject.protocol);
			} catch {
				return false;
			}
		},
	)
	.transform(absoluteUrl => {
		const urlObject = new URL(absoluteUrl);

		if (urlObject.host.endsWith('.')) {
			urlObject.host = urlObject.host.slice(0, -1);
		}

		return urlObject.toString() as
			| `https://${DomainName}/${string}`
			| `http://${DomainName}/${string}`;
	});
type AbsoluteUrl = z.infer<typeof AbsoluteUrlSchema>;

/**
 * A relative URL.
 * @remarks Normalized by the URL class.
 * @example "/about"
 */
export const RelativeUrlSchema = z
	.custom<`/${string}`>(
		relativeUrl => typeof relativeUrl === 'string' && /^\/.*/.test(relativeUrl),
		{ message: 'Invalid relative URL' },
	)
	.transform(
		relativeUrl =>
			new URL(relativeUrl, 'http://a').toString().substring(8) as `/${string}`,
	);
type RelativeUrl = z.infer<typeof RelativeUrlSchema>;

/**
 * Normalizes an absolute or relative URL.
 * @param url - The URL to normalize
 * @param domainName - The domain name to use if the URL is relative
 * @returns The normalized URL
 */
export function normalizeUrl(
	url: AbsoluteUrl | RelativeUrl,
	domainName: DomainName,
) {
	if (url.startsWith('/')) {
		return `https://${domainName}${url}`;
	} else {
		return url;
	}
}

import isValidDomain from 'is-valid-domain';
import { z } from 'zod';

/**
 * A domain name.
 * @remarks Normalized by being converted to lowercase and having a trailing
 * period removed if present.
 * @example "example.com"
 */
type DomainName = z.infer<typeof DomainNameSchema>;
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

/**
 * An absolute URL.
 * @remarks Normalized by the URL class.
 * @example "https://example.com/about"
 */
type AbsoluteUrl = z.infer<typeof AbsoluteUrlSchema>;
export const AbsoluteUrlSchema = z
	.custom<`https://${DomainName}${string}` | `http://${DomainName}${string}`>(
		url => {
			if (typeof url !== 'string') {
				return false;
			}

			try {
				const urlObject = new URL(url);

				if (!['https:', 'http:'].includes(urlObject.protocol)) {
					return false;
				}

				if (!DomainNameSchema.safeParse(urlObject.host).success) {
					return false;
				}

				return true;
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

/**
 * A relative URL.
 * @remarks Normalized by the URL class.
 * @example "/about"
 */
type RelativeUrl = z.infer<typeof RelativeUrlSchema>;
export const RelativeUrlSchema = z
	.custom<`/${string}`>(
		relativeUrl => typeof relativeUrl === 'string' && /^\/.*/.test(relativeUrl),
		{ message: 'Invalid relative URL' },
	)
	.transform(
		relativeUrl =>
			new URL(relativeUrl, 'http://a').toString().substring(8) as `/${string}`,
	);

/**
 * An absolute or relative URL.
 */
type Url = AbsoluteUrl | RelativeUrl;
export const UrlSchema = z.union([AbsoluteUrlSchema, RelativeUrlSchema]);

/**
 * Normalizes an absolute or relative URL.
 * @param url - The URL to normalize
 * @param domainName - The domain name to use if the URL is relative
 * @returns The normalized URL
 */
export function normalizeUrl(url: Url, domainName: DomainName) {
	if (url.startsWith('/')) {
		return `https://${domainName}${url}`;
	} else {
		return url;
	}
}

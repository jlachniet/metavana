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
 * A relative URL.
 * @remarks Normalized by being URI encoded.
 * @example "/about"
 */
export const RelativeUrlSchema = z
	.custom<`/${string}`>(
		relativeUrl => typeof relativeUrl === 'string' && /^\/.*/.test(relativeUrl),
		{ message: 'Invalid relative URL' },
	)
	.transform(relativeUrl => encodeURI(relativeUrl) as `/${string}`);

/**
 * Normalizes an absolute or relative URL.
 * @param url - The URL to normalize
 * @param domainName - The domain name, only used if the URL is relative
 * @returns The normalized URL
 */
export function normalizeUrl(url: string, domainName: DomainName) {
	if (url.startsWith('/')) {
		return `https://${domainName}${url}`;
	} else {
		return new URL(url).toString();
	}
}

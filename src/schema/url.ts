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

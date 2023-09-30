import { ZodIssue } from 'zod';

/**
 * Formats a Zod issue path as a string.
 * @param topLevelKey - The top-level key
 * @param path - The path
 * @returns The formatted path
 */
export function formatZodPath(topLevelKey: string, path: ZodIssue['path']) {
	return (
		topLevelKey +
		path
			.map(path => {
				if (typeof path === 'string') {
					return `.${path}`;
				} else {
					return `[${path}]`;
				}
			})
			.join('')
	);
}

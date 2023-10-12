/**
 * Checks whether a string can be used as a key in object dot notation without
 * being quoted.
 * @param key - The key
 * @returns Whether the key can be used in object dot notation without being
 * quoted
 */
function isUnquotedDotNotationKey(key: string) {
	return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(key);
}

/**
 * Formats a Zod issue path as a string.
 * @param topLevelKey - The top-level key
 * @param path - The path
 * @returns The formatted path
 *
 * @example
 * ```
 * const topLevelKey = 'foo';
 * const path = ['bar', 0, 'b-a-z'];
 *
 * formatZodPath(topLevelKey, path); // 'foo.bar[0]["b-a-z"]'
 * ```
 */
export function formatZodPath(topLevelKey: string, path: (string | number)[]) {
	return (
		topLevelKey +
		path
			.map(key => {
				if (typeof key === 'number') {
					return `[${key}]`;
				} else if (isUnquotedDotNotationKey(key)) {
					return `.${key}`;
				} else {
					return `["${key}"]`;
				}
			})
			.join('')
	);
}

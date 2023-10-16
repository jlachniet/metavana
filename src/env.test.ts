import { METAVANA_VERSION } from './env.js';
import { describe, expect, it } from '@jest/globals';
import { readFile } from 'fs/promises';

describe('METAVANA_VERSION', () => {
	it('should match the package.json version', async () => {
		const packageJson = JSON.parse(
			await readFile('./package.json', { encoding: 'utf-8' }),
		) as { version: string };

		expect(METAVANA_VERSION).toBe(packageJson.version);
	});
});

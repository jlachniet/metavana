import { getExecExitCode } from '../utils.js';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { rmSync } from 'fs';

const exampleNames = [
	'getting-started',
	'minimal',
	'midis2jam2',
	'site-name-translations',
];

beforeAll(() => {
	rmSync('examples/output', {
		recursive: true,
		force: true,
	});
});

describe('examples', () => {
	exampleNames.forEach(example =>
		it(`should contain a valid ${example}.json config`, () => {
			expect(
				getExecExitCode(
					`node build examples/${example}.json examples/output/${example}`,
				),
			).toBe(0);
		}),
	);
});

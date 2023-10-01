import { getExecExitCode } from './_utils.js';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { rmSync } from 'fs';

const exampleNames = ['minimal', 'midis2jam2'];

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

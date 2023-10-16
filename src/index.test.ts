import { getExecExitCode } from './testing/exec.js';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import {
	mkdirSync,
	readFileSync,
	readdirSync,
	rmSync,
	writeFileSync,
} from 'fs';

const tempDir = 'build/temp';

const corruptConfig = `${tempDir}/corrupt.json`; // Invalid JSON
const invalidConfig = `${tempDir}/invalid.json`; // JSON, but not matching schema
const validConfig = `${tempDir}/valid.json`; // Valid JSON

const invalidDir = `${tempDir}/no-directory`; // Non-existent directory
const emptyDir = `${tempDir}/empty-directory`; // Empty directory
const nonEmptyDir = `${tempDir}/non-empty-directory`; // Non-empty directory

beforeEach(() => {
	mkdirSync(tempDir);
	writeFileSync(corruptConfig, 'corrupt-data');
	writeFileSync(invalidConfig, JSON.stringify({}));
	writeFileSync(validConfig, readFileSync('examples/minimal.json', 'utf8'));

	mkdirSync(emptyDir);
	mkdirSync(nonEmptyDir);
	writeFileSync(`${nonEmptyDir}/example-file`, 'examples-contents');
});

afterEach(() => {
	rmSync(tempDir, { recursive: true });
});

describe('index.js', () => {
	it('should return an exit code of 1 if no arguments are provided', () => {
		expect(getExecExitCode('node build')).toBe(1);
	});

	it('should return an exit code of 1 if too few arguments are provided', () => {
		expect(getExecExitCode('node build arg1')).toBe(1);
	});

	it('should return an exit code of 1 if too many arguments are provided', () => {
		expect(getExecExitCode('node build arg1 arg2 arg3')).toBe(1);
	});

	it('should return an exit code of 1 if the config file path is not readable', () => {
		expect(getExecExitCode('node build arg1 arg2')).toBe(1);
	});

	it('should return an exit code of 1 if the config file is invalid JSON', () => {
		expect(getExecExitCode(`node build ${corruptConfig} arg2`)).toBe(1);
	});

	it('should return an exit code of 1 if the config file does not match the schema', () => {
		expect(getExecExitCode(`node build ${invalidConfig} arg2`)).toBe(1);
	});

	it('should return an exit code of 1 if the output path is to a file', () => {
		expect(getExecExitCode(`node build ${validConfig} ${validConfig}`)).toBe(1);
	});

	it('should return an exit code of 1 if the output path is not empty', () => {
		expect(getExecExitCode(`node build ${validConfig} ${nonEmptyDir}`)).toBe(1);
	});

	it('should return an exit code of 0 if the output path does not exist', () => {
		expect(getExecExitCode(`node build ${validConfig} ${invalidDir}`)).toBe(0);
	});

	it('should return an exit code of 0 if the output path is an empty directory', () => {
		expect(getExecExitCode(`node build ${validConfig} ${emptyDir}`)).toBe(0);
	});
});

describe('examples', () => {
	rmSync('examples/output', {
		recursive: true,
		force: true,
	});

	readdirSync('examples').forEach(example =>
		it(`should contain a valid ${example} config`, () => {
			expect(
				getExecExitCode(
					`node build examples/${example} examples/output/${example.slice(
						0,
						-5,
					)}`,
				),
			).toBe(0);
		}),
	);
});

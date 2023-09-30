import { getExecExitCode } from './utils.js';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';

const corruptConfig = 'build/temp/corrupt.json'; // Invalid JSON
const invalidConfig = 'build/temp/invalid.json'; // JSON, but invalid
const validConfig = 'build/temp/valid.json'; // Valid JSON

const invalidDir = 'build/temp/no-directory'; // Non-existent directory
const emptyDir = 'build/temp/empty-directory'; // Empty direction
const nonEmptyDir = 'build/temp/non-empty-directory'; // Non-empty directory

beforeEach(() => {
	mkdirSync('build/temp');
	writeFileSync(corruptConfig, 'foo');
	writeFileSync(invalidConfig, JSON.stringify({}));
	writeFileSync(validConfig, readFileSync('examples/minimal.json', 'utf8'));

	mkdirSync(emptyDir);
	mkdirSync(nonEmptyDir);
	writeFileSync(`${nonEmptyDir}/foo`, 'bar');
});

afterEach(() => {
	rmSync('build/temp', { recursive: true });
});

describe('index.js', () => {
	it('should return an exit code of 1 if no arguments are provided', () => {
		expect(getExecExitCode('node build')).toBe(1);
	});

	it('should return an exit code of 1 if too few arguments are provided', () => {
		expect(getExecExitCode('node build foo')).toBe(1);
	});

	it('should return an exit code of 1 if too many arguments are provided', () => {
		expect(getExecExitCode('node build foo bar baz')).toBe(1);
	});

	it('should return an exit code of 1 if the config file path is not readable', () => {
		expect(getExecExitCode('node build foo bar')).toBe(1);
	});

	it('should return an exit code of 1 if the config file is invalid JSON', () => {
		expect(getExecExitCode(`node build ${corruptConfig} bar`)).toBe(1);
	});

	it('should return an exit code of 1 if the config file does not match the schema', () => {
		expect(getExecExitCode(`node build ${invalidConfig} bar`)).toBe(1);
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

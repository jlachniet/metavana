import { ExecSyncError } from '../errors.js';
import { describe, expect, it } from '@jest/globals';
import { execSync } from 'child_process';
import { Schema, ZodEffects, ZodObject, ZodType } from 'zod';

/**
 * Gets the exit code of a command.
 * @param command - The command
 * @returns The exit code
 */
export function getExecExitCode(command: string) {
	let exitCode = 0;

	try {
		execSync(command, { stdio: 'ignore' });
	} catch (error) {
		exitCode = (error as ExecSyncError).status;
	}

	return exitCode;
}

/**
 * A set of values used to test a schema with.
 */
interface SchemaTestValues {
	/**
	 * The values that the schema should parse as is.
	 */
	validValues?: unknown[];
	/**
	 * The pairs representing the values that the schema should parse as
	 * something else.
	 */
	normalizableValues?: [unknown, unknown][];
	/**
	 * The values that the schema should not parse.
	 */
	invalidValues?: unknown[];
}

/**
 * Describes a schema for use in testing.
 * @param schema - The schema
 * @param schemaName - The name of the schema
 * @param testValues - The test values
 */
export function describeSchema(
	schema: Schema,
	schemaName: string,
	testValues: SchemaTestValues,
) {
	const validValues = testValues.validValues ?? [];
	const normalizableValues = testValues.normalizableValues ?? [];
	const invalidValues = testValues.invalidValues ?? [];

	describe(schemaName, () => {
		for (const testValue of validValues) {
			it(`should parse ${JSON.stringify(testValue)}`, () => {
				expect(schema.parse(testValue)).toEqual(testValue);
			});
		}

		for (const [testValue, normalizedValue] of normalizableValues) {
			it(`should parse ${JSON.stringify(testValue)} as ${JSON.stringify(
				normalizedValue,
			)}`, () => {
				expect(schema.parse(testValue)).toEqual(normalizedValue);
			});
		}

		for (const testValue of invalidValues) {
			it(`should not parse ${JSON.stringify(testValue)}`, () => {
				expect(() => {
					schema.parse(testValue);
				}).toThrow();
			});
		}
	});
}

/**
 * Describes an object schema for use in testing.
 * @param schema - The schema
 * @param schemaName - The name of the schema
 * @param requiredProperties - The required properties
 * @param optionalProperties - The optional properties
 */
export function describeObjectSchema(
	schema: ZodObject<{}> | ZodEffects<ZodType<unknown>>,
	schemaName: string,
	requiredProperties: object,
	optionalProperties: object,
) {
	describe(schemaName, () => {
		if (Object.keys(requiredProperties).length > 0) {
			it('should not parse an empty object', () => {
				expect(() => {
					schema.parse({});
				}).toThrow();
			});
		}

		it('should parse an object with only the required properties', () => {
			expect(() => {
				schema.parse(requiredProperties);
			}).not.toThrow();
		});

		it('should parse an object will all properties', () => {
			expect(() => {
				schema.parse({ ...requiredProperties, ...optionalProperties });
			}).not.toThrow();
		});

		it('should not parse an object with extraneous properties', () => {
			expect(() => {
				schema.parse({
					...requiredProperties,
					...optionalProperties,
					foo: 'bar',
				});
			}).toThrow();
		});
	});
}

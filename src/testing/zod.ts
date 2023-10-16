import { describe, expect, it } from '@jest/globals';
import {
	Schema,
	ZodDefault,
	ZodEffects,
	ZodObject,
	ZodOptional,
	ZodRawShape,
	ZodTypeAny,
} from 'zod';

/**
 * Tests that a schema parses a value
 * @param testName - The name of the test
 * @param schema - The schema
 * @param value - The value
 * @param mustBeUnchanged - Whether the parsed value must be unchanged
 */
export function itShouldParse(
	testName: string,
	schema: Schema<unknown>,
	value: unknown,
	mustBeUnchanged = true,
) {
	it(`it should parse ${testName}`, () => {
		if (mustBeUnchanged) {
			expect(schema.parse(value)).toEqual(value);
		} else {
			expect(() => schema.parse(value)).not.toThrow();
		}
	});
}

/**
 * Tests that a schema parses a value as something else.
 * @param testName - The name of the test
 * @param schema - The schema
 * @param value - The value
 * @param parsedValue - The parsed value
 */
export function itShouldParseAs(
	testName: string,
	schema: Schema<unknown>,
	value: unknown,
	parsedValue: unknown,
) {
	it(`it should parse ${testName}`, () =>
		expect(schema.parse(value)).toEqual(parsedValue));
}

/**
 * Tests that a schema does not parse a value.
 * @param testName - The name of the test
 * @param schema - The schema
 * @param value - The value
 */
export function itShouldNotParse(
	testName: string,
	schema: Schema<unknown>,
	value: unknown,
) {
	it(`it should not parse ${testName}`, () =>
		expect(() => schema.parse(value)).toThrow());
}

/**
 * A utility type which removes the keys from a type which have a type of
 * never.
 */
type RemoveNeverKeys<T> = {
	[K in keyof T as T[K] extends never ? never : K]: T[K];
};

/**
 * A utility type which extracts the shape of a ZodObject.
 */
type ExtractZodObjectShape<T extends ZodObject<{}>> = T extends ZodObject<
	infer U
>
	? U
	: never;

/**
 * A utility type which extracts the type of the required properties of a
 * ZodObject shape.
 */
type ExtractRequiredZodObjectShapeType<T extends ZodRawShape> =
	RemoveNeverKeys<{
		[K in keyof T]: T[K] extends
			| ZodOptional<ZodTypeAny>
			| ZodDefault<ZodTypeAny>
			? never
			: T[K]['_type'];
	}>;

/**
 * A utility type which extracts the type of the optional properties of a
 * ZodObject shape.
 */
type ExtractOptionalZodObjectShapeType<T extends ZodRawShape> =
	RemoveNeverKeys<{
		[K in keyof T]: T[K] extends ZodOptional<infer U> | ZodDefault<infer U>
			? U['_type']
			: never;
	}>;

/**
 * A ZodObject schema or some amount of nested ZodEffects schemas wrapping a
 * ZodObject schema.
 */
type ZodObjectWithEffects =
	| ZodObject<{}>
	| ZodEffects<ZodObject<{}>>
	| ZodEffects<ZodEffects<ZodObject<{}>>>
	| ZodEffects<ZodEffects<ZodEffects<ZodObject<{}>>>>
	| ZodEffects<ZodEffects<ZodEffects<ZodEffects<ZodObject<{}>>>>>
	| ZodEffects<ZodEffects<ZodEffects<ZodEffects<ZodEffects<ZodObject<{}>>>>>>;

/**
 * Extracts the ZodObject from a ZodObjectWithEffects.
 */
type ExtractZodObjectWithEffects<T> = T extends ZodEffects<infer U>
	? ExtractZodObjectWithEffects<U>
	: T;

/**
 * Describes an object schema for use in testing.
 * @param schema - The schema
 * @param schemaName - The name of the schema
 * @param requiredProperties - The required properties
 * @param optionalProperties - The optional properties
 * @param additionalTests - Any additional tests to run
 * @param allowExtraneousProperties - Whether to allow extraneous properties
 */
export function describeObjectSchema<
	T extends ZodObjectWithEffects,
	U extends ZodRawShape = ExtractZodObjectShape<ExtractZodObjectWithEffects<T>>,
>(
	schema: T,
	schemaName: string,
	requiredProperties: ExtractRequiredZodObjectShapeType<U>,
	optionalProperties: ExtractOptionalZodObjectShapeType<U>,
	additionalTests?: (() => void) | null,
	allowExtraneousProperties = false,
) {
	describe(schemaName, () => {
		if (Object.keys(requiredProperties).length > 0) {
			itShouldNotParse('an empty object', schema, {});

			itShouldParse(
				'an object with only the required properties',
				schema,
				requiredProperties,
				false,
			);
		} else {
			itShouldParse('an empty object', schema, {}, false);
		}

		itShouldParse(
			'an object with all properties',
			schema,
			{ ...requiredProperties, ...optionalProperties },
			false,
		);

		if (!allowExtraneousProperties) {
			itShouldNotParse('an object with extraneous properties', schema, {
				...requiredProperties,
				...optionalProperties,
				foo: 'bar',
			});
		}

		additionalTests?.();
	});
}

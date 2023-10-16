import { expect, it, jest } from '@jest/globals';

/**
 * A type of message that can be logged.
 */
type LogType = 'log' | 'info' | 'warn' | 'error';

/**
 * Tests that a function logs a specific message.
 * @param testName - The test name
 * @param logFunction - The function to test
 * @param logType - The type of message that should be logged
 * @param output - The message that should be logged
 */
export function itShouldLog(
	testName: string,
	logFunction: () => void,
	logType: LogType,
	output: string,
) {
	it(`should log ${testName}`, () => {
		const logSpy = jest.spyOn(console, logType).mockImplementation(() => {});
		logFunction();
		expect(logSpy).toHaveBeenCalledWith(output);
		jest.restoreAllMocks();
	});
}

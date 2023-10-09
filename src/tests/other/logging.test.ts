import { Logger, USAGE_MESSAGE } from '../../logging.js';
import { describe, expect, it, jest } from '@jest/globals';
import chalk from 'chalk';

describe('Logger', () => {
	it('should log info messages', () => {
		const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
		Logger.info('test');
		expect(logSpy).toHaveBeenCalledWith(`${chalk.cyan('•')} test`);
		jest.restoreAllMocks();
	});

	it('should log success messages', () => {
		const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
		Logger.success('test');
		expect(logSpy).toHaveBeenCalledWith(`${chalk.green('✓')} test`);
		jest.restoreAllMocks();
	});

	it('should log warning messages', () => {
		const logSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
		Logger.warn('test');
		expect(logSpy).toHaveBeenCalledWith(`${chalk.yellow('!')} test`);
		jest.restoreAllMocks();
	});

	it('should log error messages', () => {
		const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
		Logger.error('test');
		expect(logSpy).toHaveBeenCalledWith(`${chalk.red('×')} test`);
		jest.restoreAllMocks();
	});

	it('should log the usage message', () => {
		const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
		Logger.usage();
		expect(logSpy).toHaveBeenCalledWith(USAGE_MESSAGE);
		jest.restoreAllMocks();
	});
});

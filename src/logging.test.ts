import { Logger, USAGE_MESSAGE } from './logging.js';
import { itShouldLog } from './testing/logging.js';
import { describe } from '@jest/globals';
import chalk from 'chalk';

describe('Logger', () => {
	itShouldLog(
		'info messages',
		() => Logger.info('test'),
		'info',
		`${chalk.cyan('•')} test`,
	);

	itShouldLog(
		'success messages',
		() => Logger.success('test'),
		'info',
		`${chalk.green('✓')} test`,
	);

	itShouldLog(
		'warning messages',
		() => Logger.warn('test'),
		'warn',
		`${chalk.yellow('!')} test`,
	);

	itShouldLog(
		'error messages',
		() => Logger.error('test'),
		'error',
		`${chalk.red('×')} test`,
	);

	itShouldLog('the usage message', () => Logger.usage(), 'info', USAGE_MESSAGE);
});

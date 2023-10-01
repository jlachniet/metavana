import chalk from 'chalk';

/**
 * The usage message.
 */
export const USAGE_MESSAGE = `
${chalk.bold('Usage:')}
    metavana ${chalk.yellowBright('<configFile> <outputFolder>')}

${chalk.bold('Arguments:')}
    ${chalk.yellowBright('<configFile>')}    The path to the config file
    ${chalk.yellowBright('<outputFolder>')}  The path to the output folder

See ${chalk.bold('README.md')} for more information.
`;

/**
 * The logger object.
 */
export const Logger = {
	/**
	 * Logs an info message.
	 * @param message - The message
	 */
	info: (message: string) => console.info(`${chalk.cyan('•')} ${message}`),

	/**
	 * Logs a success message.
	 * @param message - The message
	 */
	success: (message: string) => console.info(`${chalk.green('✓')} ${message}`),

	/**
	 * Logs a warning message.
	 * @param message - The message
	 */
	warn: (message: string) => console.warn(`${chalk.yellow('!')} ${message}`),

	/**
	 * Logs an error message.
	 * @param message - The message
	 */
	error: (message: string) => console.error(`${chalk.red('×')} ${message}`),

	/**
	 * Logs the usage message.
	 */
	usage: () => console.info(USAGE_MESSAGE),
};

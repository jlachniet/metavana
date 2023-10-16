import { execSync } from 'child_process';

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
		exitCode = (error as { status: number }).status;
	}

	return exitCode;
}

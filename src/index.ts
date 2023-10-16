#!/usr/bin/env node
import { generateHtml } from './generation/html.js';
import { generatePath } from './generation/path.js';
import { Logger } from './logging.js';
import { Config, ConfigSchema } from './schema/config.js';
import { formatZodPath } from './zod.js';
import { mkdir, readFile, readdir, stat, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { ZodError } from 'zod';

/* istanbul ignore file: tested after building by index.test.ts */

/**
 * The main function, handles the CLI and basic control flow.
 */
async function main() {
	const [configPath, outputPath, ...otherArgs] = process.argv.slice(2);

	if (!configPath || !outputPath || otherArgs.length > 0) {
		Logger.error('Invalid arguments');
		Logger.usage();
		process.exitCode = 1;
		return;
	}

	let configEncoded: string;
	let configJsonParsed: unknown;
	let config: Config;

	try {
		configEncoded = await readFile(configPath, 'utf-8');
	} catch (error) {
		Logger.error(`Failed to read config file`);
		Logger.error((error as NodeJS.ErrnoException).message);
		process.exitCode = 1;
		return;
	}

	try {
		configJsonParsed = JSON.parse(configEncoded);
	} catch (error) {
		Logger.error(`Failed to parse config file`);
		Logger.error((error as SyntaxError).message);
		process.exitCode = 1;
		return;
	}

	try {
		config = ConfigSchema.parse(configJsonParsed);
	} catch (error) {
		Logger.error('Invalid config file');

		for (const issue of (error as ZodError).issues) {
			const path = formatZodPath('config', issue.path);
			const message = issue.message;

			Logger.error(`${path}: ${message}`);
		}

		process.exitCode = 1;
		return;
	}

	try {
		const outputDirectoryStats = await stat(outputPath);

		if (outputDirectoryStats.isFile()) {
			Logger.error('Output path already exists and is not a directory');
			process.exitCode = 1;
			return;
		}

		const filePaths = await readdir(outputPath);

		if (filePaths.length > 0) {
			Logger.error('Output path already exists and is not empty');
			process.exitCode = 1;
			return;
		}
	} catch (error) {
		if ((error as { code: string }).code !== 'ENOENT') {
			Logger.error('Failed to get output path info');
			Logger.error((error as { message: string }).message);
			process.exitCode = 1;
			return;
		}
	}

	try {
		for (const page of config.pages) {
			const html = generateHtml(config.site, page);
			const path = generatePath(page);

			const joinedPath = join(outputPath, generatePath(page));

			await mkdir(dirname(joinedPath), { recursive: true });
			await writeFile(joinedPath, html);

			Logger.info(`Wrote file ${path}`);
		}
	} catch (error) {
		Logger.error('Failed to write output file');
		Logger.error((error as NodeJS.ErrnoException).message);
		process.exitCode = 1;
		return;
	}

	Logger.success(
		`Successfully generated the site ${JSON.stringify(config.site.name)}`,
	);
}

main();

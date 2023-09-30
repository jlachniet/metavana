import { SpawnSyncReturns } from 'child_process';

/**
 * An error thrown by `stat` from `fs/promises`.
 */
export type StatError = Error &
	Required<Omit<NodeJS.ErrnoException, keyof Error>>;

/**
 * An error thrown by `execSync` from `child_process`.
 */
export interface ExecSyncError extends Error, SpawnSyncReturns<Buffer> {
	status: number;
}

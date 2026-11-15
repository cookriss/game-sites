import type { DataSource } from './model';
import { deadlockApi } from './deadlock-api';

/**
 * Build-time data source. To move to an official API later, add a file that
 * implements DataSource (and LiveSource in live.ts for the browser), then select it with DATA_SOURCE.
 */
const sources: Record<string, DataSource> = { 'deadlock-api': deadlockApi };
export const data: DataSource = sources[process.env.DATA_SOURCE || 'deadlock-api'];
export * from './model';

import type { DataSource } from './model';
import { deadlockApi } from './deadlock-api';

/**
 * Pick the data source. To move to an official API later, add a new file that
 * implements DataSource and register it here, then set DATA_SOURCE.
 */
const sources: Record<string, DataSource> = { 'deadlock-api': deadlockApi };
export const data: DataSource = sources[process.env.DATA_SOURCE || 'deadlock-api'];
export * from './model';

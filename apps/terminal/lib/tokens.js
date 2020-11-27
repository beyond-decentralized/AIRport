import { system } from '@airport/di';
const terminal = system('airport').lib('terminal');
export const DATABASE_MANAGER = terminal.token('IDatabaseManager');
export const DELETE_MANAGER = terminal.token('IDeleteManager');
export const HISTORY_MANAGER = terminal.token('IHistoryManager');
export const INSERT_MANAGER = terminal.token('IInsertManager');
export const OFFLINE_DELTA_STORE = terminal.token('IOfflineDeltaStore');
export const ONLINE_MANAGER = terminal.token('IOnlineManager');
export const QUERY_MANAGER = terminal.token('IQueryManager');
export const REPOSITORY_MANAGER = terminal.token('IRepositoryManager');
export const UPDATE_MANAGER = terminal.token('IUpdateManager');
//# sourceMappingURL=tokens.js.map
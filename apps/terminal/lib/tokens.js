import { system } from '@airport/di';
const terminal = system('airport').lib('terminal');
export const DATABASE_MANAGER = terminal.token();
export const DELETE_MANAGER = terminal.token();
export const HISTORY_MANAGER = terminal.token();
export const INSERT_MANAGER = terminal.token();
export const OFFLINE_DELTA_STORE = terminal.token();
export const ONLINE_MANAGER = terminal.token();
export const QUERY_MANAGER = terminal.token();
export const REPOSITORY_MANAGER = terminal.token();
export const UPDATE_MANAGER = terminal.token();
//# sourceMappingURL=tokens.js.map
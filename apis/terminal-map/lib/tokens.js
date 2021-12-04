import { system } from '@airport/di';
const terminalMap = system('airport').lib('terminal-map');
export const TERMINAL_STORE = terminalMap.token('TERMINAL_STORE');
export const TRANSACTION_MANAGER = terminalMap.token('TRANSACTION_MANAGER');
export const TRANSACTIONAL_RECEIVER = terminalMap.token('TRANSACTIONAL_RECEIVER');
export const TRANSACTIONAL_SERVER = terminalMap.token('TRANSACTIONAL_SERVER');
//# sourceMappingURL=tokens.js.map
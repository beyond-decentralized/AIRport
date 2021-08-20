import { system } from '@airport/di';
const terminalMap = system('airport').lib('terminal-map');
export const TERMINAL_STORE = terminalMap.token('ITerminalStore');
export const TRANSACTION_MANAGER = terminalMap.token('ITransactionManager');
export const TRANSACTIONAL_RECEIVER = terminalMap.token('ITransactionalReceiver');
export const TRANSACTIONAL_SERVER = terminalMap.token('ITransactionalServer');
//# sourceMappingURL=tokens.js.map
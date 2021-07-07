import { system } from '@airport/di';
const terminalMap = system('airport').lib('terminal-map');
export const TERMINAL_STORE = terminalMap.token('ITerminalStore');
export const TRANSACTIONAL_CONNECTOR = terminalMap.token('ITransactionalConnector');
export const TRANSACTION_MANAGER = terminalMap.token('ITransactionManager');
//# sourceMappingURL=tokens.js.map
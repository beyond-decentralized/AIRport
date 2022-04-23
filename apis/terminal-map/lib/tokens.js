import { lib } from '@airport/direction-indicator';
import { OPERATION_CONTEXT_LOADER } from '@airport/ground-control';
const terminalMap = lib('terminal-map');
export const APPLICATION_INITIALIZER = terminalMap.token('APPLICATION_INITIALIZER');
export const DOMAIN_RETRIEVER = terminalMap.token('DOMAIN_RETRIEVER');
export const STORE_DRIVER = terminalMap.token('STORE_DRIVER');
export const TERMINAL_STORE = terminalMap.token('TERMINAL_STORE');
export const TRANSACTION_MANAGER = terminalMap.token('TRANSACTION_MANAGER');
export const TRANSACTIONAL_RECEIVER = terminalMap.token('TRANSACTIONAL_RECEIVER');
export const TRANSACTIONAL_SERVER = terminalMap.token('TRANSACTIONAL_SERVER');
TRANSACTIONAL_SERVER.setDependencies({
    operationContextLoader: OPERATION_CONTEXT_LOADER
});
//# sourceMappingURL=tokens.js.map
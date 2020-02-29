import { system } from '@airport/di';
const terminalMap = system('airport').lib('terminal-map');
export const TERMINAL_STORE = terminalMap.token();
export const TRANSACTION_MANAGER = terminalMap.token();
//# sourceMappingURL=tokens.js.map
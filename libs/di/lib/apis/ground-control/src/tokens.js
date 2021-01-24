import { system } from '@airport/di';
const groundControl = system('airport').lib('ground-control');
export const CONFIG;
export const RXJS = groundControl.token('IRxJs');
export const STORE_DRIVER = groundControl.token('IStoreDriver');
export const TRANS_CONNECTOR = groundControl.token('ITransactionalConnector');
//# sourceMappingURL=tokens.js.map
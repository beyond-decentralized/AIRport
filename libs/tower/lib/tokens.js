import { system } from '@airport/di';
const tower = system('airport').lib('tower');
export const TRANS_SERVER = tower.token('ITransactionalServer');
export const OPERATION_CONTEXT_LOADER = tower.token('IOperationContextLoader');
//# sourceMappingURL=tokens.js.map
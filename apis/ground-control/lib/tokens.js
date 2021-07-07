import { system } from '@airport/di';
const groundControl = system('airport').lib('ground-control');
export const OPERATION_CONTEXT_LOADER = groundControl.token('IOperationContextLoader');
export const STORE_DRIVER = groundControl.token('IStoreDriver');
//# sourceMappingURL=tokens.js.map
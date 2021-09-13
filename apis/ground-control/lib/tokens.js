import { system } from '@airport/di';
const groundControl = system('airport').lib('ground-control');
export const ENTITY_STATE_MANAGER = groundControl.token('IEntityStateManager');
export const OPERATION_CONTEXT_LOADER = groundControl.token('IOperationContextLoader');
export const STORE_DRIVER = groundControl.token('IStoreDriver');
export const TRANSACTIONAL_CONNECTOR = groundControl.token('ITransactionalConnector');
//# sourceMappingURL=tokens.js.map
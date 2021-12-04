import { system } from '@airport/di';
const groundControl = system('airport').lib('ground-control');
export const ENTITY_STATE_MANAGER = groundControl.token('ENTITY_STATE_MANAGER');
export const OPERATION_CONTEXT_LOADER = groundControl.token('OPERATION_CONTEXT_LOADER');
export const STORE_DRIVER = groundControl.token('STORE_DRIVER');
export const TRANSACTIONAL_CONNECTOR = groundControl.token('TRANSACTIONAL_CONNECTOR');
//# sourceMappingURL=tokens.js.map
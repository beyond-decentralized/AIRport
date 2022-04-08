import { lib } from '@airport/di';
const groundControl = lib('ground-control');
export const ENTITY_STATE_MANAGER = groundControl.token('ENTITY_STATE_MANAGER');
export const INTER_APP_API_CLIENT = groundControl.token('INTER_APP_API_CLIENT');
export const OPERATION_CONTEXT_LOADER = groundControl.token('OPERATION_CONTEXT_LOADER');
export const TRANSACTIONAL_CONNECTOR = groundControl.token('TRANSACTIONAL_CONNECTOR');
//# sourceMappingURL=tokens.js.map
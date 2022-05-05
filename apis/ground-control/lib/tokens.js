import { lib } from '@airport/direction-indicator';
const groundControl = lib('ground-control');
groundControl.autopilot = false;
export const ENTITY_STATE_MANAGER = groundControl.token({
    class: null,
    interface: 'IEntityStateManager',
    token: 'ENTITY_STATE_MANAGER'
});
export const INTER_APP_API_CLIENT = groundControl.token({
    class: null,
    interface: 'IInterAppAPIClient',
    token: 'INTER_APP_API_CLIENT'
});
export const OPERATION_CONTEXT_LOADER = groundControl.token({
    class: null,
    interface: 'IOperationContextLoader',
    token: 'OPERATION_CONTEXT_LOADER'
});
export const TRANSACTIONAL_CONNECTOR = groundControl.token({
    class: null,
    interface: 'ITransactionalConnector',
    token: 'TRANSACTIONAL_CONNECTOR'
});
//# sourceMappingURL=tokens.js.map
import { lib } from '@airport/direction-indicator';
import { DbApplicationUtils } from './impl/query/DbApplicationUtils';
const groundControl = lib('ground-control');
export const DB_APPLICATION_UTILS = groundControl.token({
    class: DbApplicationUtils,
    interface: 'IDbApplicationUtils',
    token: 'DB_APPLICATION_UTILS'
});
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
TRANSACTIONAL_CONNECTOR.setDependencies({
    dbApplicationUtils: DB_APPLICATION_UTILS,
});
//# sourceMappingURL=tokens.js.map
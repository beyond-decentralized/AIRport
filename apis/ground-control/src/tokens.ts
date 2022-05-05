import { lib } from '@airport/direction-indicator';
import { IEntityStateManager } from './lingo/core/operation/EntityStateManager';
import { IInterAppAPIClient } from './lingo/InterAppAPIClient';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';
import { IOperationContextLoader } from './lingo/OperationContextLoader';

const groundControl = lib('ground-control')
groundControl.autopilot = false

export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>({
    class: null,
    interface: 'IEntityStateManager',
    token: 'ENTITY_STATE_MANAGER'
})
export const INTER_APP_API_CLIENT = groundControl.token<IInterAppAPIClient>({
    class: null,
    interface: 'IInterAppAPIClient',
    token: 'INTER_APP_API_CLIENT'
})
export const OPERATION_CONTEXT_LOADER = groundControl.token<IOperationContextLoader>({
    class: null,
    interface: 'IOperationContextLoader',
    token: 'OPERATION_CONTEXT_LOADER'
})
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>({
    class: null,
    interface: 'ITransactionalConnector',
    token: 'TRANSACTIONAL_CONNECTOR'
})

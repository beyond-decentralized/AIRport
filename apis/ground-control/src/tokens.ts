import { lib } from '@airport/direction-indicator';
import { DbApplicationUtils } from './impl/query/DbApplicationUtils';
import { IEntityStateManager } from './lingo/core/operation/EntityStateManager';
import { ITransactionalConnector } from './lingo/ITransactionalConnector';
import { IDbApplicationUtils } from './lingo/query/DbApplicationUtils';

const groundControl = lib('ground-control')

export const DB_APPLICATION_UTILS = groundControl.token<IDbApplicationUtils>({
    class: DbApplicationUtils,
    interface: 'IDbApplicationUtils',
    token: 'DB_APPLICATION_UTILS'
})
export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>({
    class: null,
    interface: 'IEntityStateManager',
    token: 'ENTITY_STATE_MANAGER'
})
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>({
    class: null,
    interface: 'ITransactionalConnector',
    token: 'TRANSACTIONAL_CONNECTOR'
})
TRANSACTIONAL_CONNECTOR.setDependencies({
    dbApplicationUtils: DB_APPLICATION_UTILS,
})

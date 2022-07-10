import { lib } from '@airport/direction-indicator';
import { DbApplicationUtils } from './implementation/query/DbApplicationUtils';
import { ISequenceGenerator } from './implementation/SequenceGenerator';
import { IEntityStateManager } from './definition/core/operation/EntityStateManager';
import { ITransactionalConnector } from './definition/ITransactionalConnector';
import { IDbApplicationUtils } from './definition/query/DbApplicationUtils';
import { IUpdateCacheManager } from './definition/data/UpdateCacheManager';

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
export const SEQUENCE_GENERATOR = groundControl.token<ISequenceGenerator>({
    class: null,
    interface: 'ISequenceGenerator',
    token: 'SEQUENCE_GENERATOR'
})
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>({
    class: null,
    interface: 'ITransactionalConnector',
    token: 'TRANSACTIONAL_CONNECTOR'
})
export const UPDATE_CACHE_MANAGER = groundControl.token<IUpdateCacheManager>({
    class: null,
    interface: 'IUpdateCacheManager',
    token: 'UPDATE_CACHE_MANAGER'
})
TRANSACTIONAL_CONNECTOR.setDependencies({
    dbApplicationUtils: DB_APPLICATION_UTILS,
})

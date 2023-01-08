import { lib } from '@airport/direction-indicator';
import { DbApplicationUtils } from './implementation/query/DbApplicationUtils';
import { ISequenceGenerator } from './implementation/SequenceGenerator';
import { IEntityStateManager } from './definition/core/operation/EntityStateManager';
import { ITransactionalConnector } from './definition/ITransactionalConnector';
import { IUpdateCacheManager } from './definition/data/UpdateCacheManager';
import { KeyUtils } from './implementation/utils/KeyUtils';
import { AppTrackerUtils } from './implementation/utils/AppTrackerUtils';

const groundControl = lib('ground-control')

groundControl.register(
    AppTrackerUtils, DbApplicationUtils, KeyUtils
)

export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>('EntityStateManager')
export const SEQUENCE_GENERATOR = groundControl.token<ISequenceGenerator>('SequenceGenerator')
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>('TransactionalConnector')
export const UPDATE_CACHE_MANAGER = groundControl.token<IUpdateCacheManager>('UpdateCacheManager')

TRANSACTIONAL_CONNECTOR.setDependencies({
    dbApplicationUtils: DbApplicationUtils,
})

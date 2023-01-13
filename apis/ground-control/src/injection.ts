import { lib } from '@airport/direction-indicator';
import { DbApplicationUtils } from './implementation/query/DbApplicationUtils';
import { ISequenceGenerator } from './implementation/SequenceGenerator';
import { IEntityStateManager } from './definition/core/operation/EntityStateManager';
import { ITransactionalConnector } from './definition/ITransactionalConnector';
import { IUpdateCacheManager } from './definition/data/UpdateCacheManager';
import { KeyUtils } from './implementation/utils/KeyUtils';
import { AppTrackerUtils } from './implementation/utils/AppTrackerUtils';
import { Dictionary } from './definition/core/entity/Dictionary';
import { DatastructureUtils } from './implementation/utils/DatastructureUtils';
import { ApplicationReferenceUtils } from './implementation/utils/ApplicationReferenceUtils';

const groundControl = lib('ground-control')

groundControl.register(
    ApplicationReferenceUtils, AppTrackerUtils, DatastructureUtils,
    DbApplicationUtils, Dictionary, KeyUtils
)

export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>('EntityStateManager')
export const SEQUENCE_GENERATOR = groundControl.token<ISequenceGenerator>('SequenceGenerator')
export const TRANSACTIONAL_CONNECTOR = groundControl.token<ITransactionalConnector>('TransactionalConnector')
export const UPDATE_CACHE_MANAGER = groundControl.token<IUpdateCacheManager>('UpdateCacheManager')

groundControl.setDependencies(ApplicationReferenceUtils, {
    appTrackerUtils: AppTrackerUtils
})

groundControl.setDependencies(AppTrackerUtils, {
    dictionary: Dictionary
})

TRANSACTIONAL_CONNECTOR.setDependencies({
    dbApplicationUtils: DbApplicationUtils,
})

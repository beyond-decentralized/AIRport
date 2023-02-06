import { lib } from '@airport/direction-indicator';
import { DbApplicationUtils } from './implementation/query/DbApplicationUtils';
import { ISequenceGenerator } from './implementation/SequenceGenerator';
import { IEntityStateManager } from './definition/core/operation/IEntityStateManager';
import { ITransactionalConnector } from './definition/ITransactionalConnector';
import { IUpdateCacheManager } from './definition/data/UpdateCacheManager';
import { KeyUtils } from './implementation/utils/KeyUtils';
import { AppTrackerUtils } from './implementation/utils/AppTrackerUtils';
import { Dictionary } from './definition/core/entity/Dictionary';
import { DatastructureUtils } from './implementation/utils/DatastructureUtils';
import { ApplicationReferenceUtils } from './implementation/utils/ApplicationReferenceUtils';
import { IOperationDeserializer } from './definition/serialize/IOperationDeserializer';
import { IQueryParameterDeserializer } from './definition/serialize/IQueryParameterDeserializer';
import { IQueryResultsSerializer } from './definition/serialize/IQueryResultsSerializer';

const groundControl = lib('ground-control')

groundControl.register(
    ApplicationReferenceUtils, AppTrackerUtils, DatastructureUtils,
    DbApplicationUtils, KeyUtils
)

export const DICTIONARY = groundControl.token<Dictionary>(Dictionary)
export const ENTITY_STATE_MANAGER = groundControl.token<IEntityStateManager>('EntityStateManager')
export const OPERATION_DESERIALIZER = groundControl.token<IOperationDeserializer>('OperationDeserializer');
export const QUERY_PARAMETER_DESERIALIZER = groundControl.token<IQueryParameterDeserializer>('QueryParameterDeserializer');
export const QUERY_RESULTS_SERIALIZER = groundControl.token<IQueryResultsSerializer>('QueryResultsSerializer');
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

globalThis.DICTIONARY = DICTIONARY

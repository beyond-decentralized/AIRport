import { system } from '@airport/di'
import { IEntityStateManager } from './EntityStateManager'
import { IQueryResultsDeserializer } from './QueryResultsDeserializer'
import { IOperationSerializer } from './OperationSerializer'

const pressurization = system('airport')
    .lib('pressurization')

export const ENTITY_STATE_MANAGER = pressurization.token<IEntityStateManager>('IEntityStateManager')
export const QUERY_RESULTS_DESERIALIZER = pressurization.token<IQueryResultsDeserializer>('IQueryResultsDeserializer');
export const OPERATION_SERIALIZER = pressurization.token<IOperationSerializer>('IOperationSerializer');

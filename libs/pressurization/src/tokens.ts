import { system } from '@airport/di'
import { IQueryResultsDeserializer } from './QueryResultsDeserializer'
import { IOperationSerializer } from './OperationSerializer'
import { ISerializationStateManager } from './SerializationStateManager'

const pressurization = system('airport').lib('pressurization')

export const OPERATION_SERIALIZER = pressurization.token<IOperationSerializer>('OPERATION_SERIALIZER')
export const QUERY_RESULTS_DESERIALIZER = pressurization.token<IQueryResultsDeserializer>('QUERY_RESULTS_DESERIALIZER')
export const SERIALIZATION_STATE_MANAGER = pressurization.token<ISerializationStateManager>('SERIALIZATION_STATE_MANAGER')
import { lib } from '@airport/direction-indicator'
import { IQueryResultsDeserializer, QueryResultsDeserializer } from './QueryResultsDeserializer'
import { IOperationSerializer, OperationSerializer } from './OperationSerializer'
import { ISerializationStateManager, SerializationStateManager } from './SerializationStateManager'
import { AIR_ENTITY_UTILS } from '@airport/aviation-communication'

const pressurization = lib('pressurization')

export const OPERATION_SERIALIZER = pressurization.token<IOperationSerializer>({
    class: OperationSerializer,
    interface: 'IOperationSerializer',
    token: 'OPERATION_SERIALIZER'
})
export const QUERY_RESULTS_DESERIALIZER = pressurization.token<IQueryResultsDeserializer>({
    class: QueryResultsDeserializer,
    interface: 'IQueryResultsDeserializer',
    token: 'QUERY_RESULTS_DESERIALIZER'
})
export const SERIALIZATION_STATE_MANAGER = pressurization.token<ISerializationStateManager>({
    class: SerializationStateManager,
    interface: 'ISerializationStateManager',
    token: 'SERIALIZATION_STATE_MANAGER'
})

OPERATION_SERIALIZER.setDependencies({
    serializationStateManager: SERIALIZATION_STATE_MANAGER
})

QUERY_RESULTS_DESERIALIZER.setDependencies({
    airEntityUtils: AIR_ENTITY_UTILS,
    serializationStateManager: SERIALIZATION_STATE_MANAGER
})
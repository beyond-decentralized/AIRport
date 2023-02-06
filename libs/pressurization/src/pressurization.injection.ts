import { IQueryResultsDeserializer, QueryResultsDeserializer } from './QueryResultsDeserializer'
import { IOperationSerializer, OperationSerializer } from './OperationSerializer'
import { SerializationStateManager } from './SerializationStateManager'
import { AirEntityUtils } from '@airport/aviation-communication'

// This library is used in UI/Client bundles and does does not include @airport/direction-indicator
// dependency injection library
if (globalThis.IOC) {
    globalThis.OPERATION_SERIALIZER.setClass(OperationSerializer)
    globalThis.SERIALIZATION_STATE_MANAGER.setClass(SerializationStateManager)
    globalThis.QUERY_RESULTS_DESERIALIZER.setClass(QueryResultsDeserializer)

    globalThis.OPERATION_SERIALIZER.setDependencies({
        serializationStateManager: globalThis.SERIALIZATION_STATE_MANAGER
    })
    globalThis.QUERY_RESULTS_DESERIALIZER.setDependencies({
        airEntityUtils: globalThis.AIR_ENTITY_UTILS,
        serializationStateManager: globalThis.SERIALIZATION_STATE_MANAGER
    })
}

export function loadUiPressurisation(): {
    operationSerializer: IOperationSerializer,
    queryResultsDeserializer: IQueryResultsDeserializer,
} {
    if (globalThis.IOC) {
        return
    }

    const queryResultsDeserializer = new QueryResultsDeserializer()
    const operationSerializer = new OperationSerializer()
    const serializationStateManager = new SerializationStateManager()

    queryResultsDeserializer.airEntityUtils = new AirEntityUtils()
    queryResultsDeserializer.serializationStateManager = serializationStateManager
    operationSerializer.serializationStateManager = serializationStateManager

    return {
        queryResultsDeserializer,
        operationSerializer,
    }
}

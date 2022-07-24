import { lib } from '@airport/direction-indicator';
import { QueryResultsDeserializer } from './QueryResultsDeserializer';
import { OperationSerializer } from './OperationSerializer';
import { SerializationStateManager } from './SerializationStateManager';
import { AIR_ENTITY_UTILS } from '@airport/aviation-communication';
const pressurization = lib('pressurization');
export const OPERATION_SERIALIZER = pressurization.token({
    class: OperationSerializer,
    interface: 'IOperationSerializer',
    token: 'OPERATION_SERIALIZER'
});
export const QUERY_RESULTS_DESERIALIZER = pressurization.token({
    class: QueryResultsDeserializer,
    interface: 'IQueryResultsDeserializer',
    token: 'QUERY_RESULTS_DESERIALIZER'
});
export const SERIALIZATION_STATE_MANAGER = pressurization.token({
    class: SerializationStateManager,
    interface: 'ISerializationStateManager',
    token: 'SERIALIZATION_STATE_MANAGER'
});
OPERATION_SERIALIZER.setDependencies({
    serializationStateManager: SERIALIZATION_STATE_MANAGER
});
QUERY_RESULTS_DESERIALIZER.setDependencies({
    airEntityUtils: AIR_ENTITY_UTILS,
    serializationStateManager: SERIALIZATION_STATE_MANAGER
});
//# sourceMappingURL=tokens.js.map
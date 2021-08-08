import { system } from '@airport/di';
const pressurization = system('airport')
    .lib('pressurization');
export const OPERATION_SERIALIZER = pressurization.token('IOperationSerializer');
export const QUERY_RESULTS_DESERIALIZER = pressurization.token('IQueryResultsDeserializer');
export const SERIALIZATION_STATE_MANAGER = pressurization.token('ISerializationStateManager');
//# sourceMappingURL=tokens.js.map
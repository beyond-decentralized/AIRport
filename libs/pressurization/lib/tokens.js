import { system } from '@airport/di';
const pressurization = system('airport')
    .lib('pressurization');
export const QUERY_RESULTS_DESERIALIZER = pressurization.token('IQueryResultsDeserializer');
export const OPERATION_SERIALIZER = pressurization.token('IOperationSerializer');
//# sourceMappingURL=tokens.js.map
import { system } from '@airport/di';
const checkIn = system('airport')
    .lib('check-in');
export const OPERATION_DESERIALIZER = checkIn.token('IOperationDeserializer');
export const QUERY_RESULTS_SERIALIZER = checkIn.token('IQueryResultsSerializer');
export const SELECTOR_MANAGER = checkIn.token('ISelectorManager');
export const SEQUENCE_GENERATOR = checkIn.token('ISequenceGenerator');
//# sourceMappingURL=tokens.js.map
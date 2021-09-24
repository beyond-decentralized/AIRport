import { lib } from '@airport/di';
const checkIn = lib('check-in');
export const API_REGISTRY = checkIn.token('IApiRegistry');
export const API_VALIDATOR = checkIn.token('IApiValidator');
export const CLIENT_QUERY_MANAGER = checkIn.token('IClientQueryManager');
export const OPERATION_DESERIALIZER = checkIn.token('IOperationDeserializer');
export const QUERY_PARAMETER_DESERIALIZER = checkIn.token('IQueryParameterDeserializer');
export const QUERY_RESULTS_SERIALIZER = checkIn.token('IQueryResultsSerializer');
export const SELECTOR_MANAGER = checkIn.token('ISelectorManager');
export const SEQUENCE_GENERATOR = checkIn.token('ISequenceGenerator');
//# sourceMappingURL=tokens.js.map
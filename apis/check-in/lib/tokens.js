import { lib } from '@airport/di';
const checkIn = lib('check-in');
export const API_REGISTRY = checkIn.token('API_REGISTRY');
export const API_VALIDATOR = checkIn.token('API_VALIDATOR');
export const CLIENT_QUERY_MANAGER = checkIn.token('CLIENT_QUERY_MANAGER');
export const OPERATION_DESERIALIZER = checkIn.token('OPERATION_DESERIALIZER');
export const QUERY_PARAMETER_DESERIALIZER = checkIn.token('QUERY_PARAMETER_DESERIALIZER');
export const QUERY_RESULTS_SERIALIZER = checkIn.token('QUERY_RESULTS_SERIALIZER');
export const SELECTOR_MANAGER = checkIn.token('SELECTOR_MANAGER');
export const SEQUENCE_GENERATOR = checkIn.token('SEQUENCE_GENERATOR');
//# sourceMappingURL=tokens.js.map
import { system } from '@airport/di';
const pressurization = system('airport').lib('pressurization');
export const OPERATION_SERIALIZER = pressurization.token('OPERATION_SERIALIZER');
export const QUERY_RESULTS_DESERIALIZER = pressurization.token('QUERY_RESULTS_DESERIALIZER');
export const SERIALIZATION_STATE_MANAGER = pressurization.token('SERIALIZATION_STATE_MANAGER');
//# sourceMappingURL=tokens.js.map
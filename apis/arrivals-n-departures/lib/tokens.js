import { system } from '@airport/di';
const arrivalsNDepartures = system('airport').lib('arrivals-n-departures');
export const MESSAGE_FROM_TM_DESERIALIZER = arrivalsNDepartures.token('IMessageFromTMDeserializer');
export const MESSAGE_FROM_TM_SERIALIZER = arrivalsNDepartures.token('IMessageFromTMSerializer');
export const MESSAGE_FROM_TM_VERIFIER = arrivalsNDepartures.token('IMessageFromTMVerifier');
export const MESSAGE_TO_TM_DESERIALIZER = arrivalsNDepartures.token('IMessageToTMDeserializer');
export const MESSAGE_TO_TM_SERIALIZER = arrivalsNDepartures.token('IMessageToTMSerializer');
export const MESSAGE_TO_TM_VERIFIER = arrivalsNDepartures.token('IMessageToTMVerifier');
export const SYNC_CONNECTION_SERVER = arrivalsNDepartures.token('ISyncConnectionServer');
export const TM_DATA_SERIALIZER = arrivalsNDepartures.token('ITMDataSerializer');
export const TM_DATA_DESERIALIZER = arrivalsNDepartures.token('ITMDataDeserializer');
export const TM_DATA_FORMAT_VERIFIER = arrivalsNDepartures.token('ITMDataFormatVerifier');
export const TM_DATA_SCHEMA_VERIFIER = arrivalsNDepartures.token('ITMDataSchemaVerifier');
//# sourceMappingURL=tokens.js.map
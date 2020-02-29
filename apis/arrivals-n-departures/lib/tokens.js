import { system } from '@airport/di';
const arrivalsNDepartures = system('airport').lib('arrivals-n-departures');
export const MESSAGE_FROM_TM_DESERIALIZER = arrivalsNDepartures.token();
export const MESSAGE_FROM_TM_SERIALIZER = arrivalsNDepartures.token();
export const MESSAGE_FROM_TM_VERIFIER = arrivalsNDepartures.token();
export const MESSAGE_TO_TM_DESERIALIZER = arrivalsNDepartures.token();
export const MESSAGE_TO_TM_SERIALIZER = arrivalsNDepartures.token();
export const MESSAGE_TO_TM_VERIFIER = arrivalsNDepartures.token();
export const SYNC_CONNECTION_SERVER = arrivalsNDepartures.token();
export const TM_DATA_SERIALIZER = arrivalsNDepartures.token();
export const TM_DATA_DESERIALIZER = arrivalsNDepartures.token();
export const TM_DATA_FORMAT_VERIFIER = arrivalsNDepartures.token();
export const TM_DATA_SCHEMA_VERIFIER = arrivalsNDepartures.token();
//# sourceMappingURL=tokens.js.map
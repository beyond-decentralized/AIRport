import { system } from '@airport/di';
const arrivalsNDepartures = system('airport').lib('arrivals-n-departures');
export const SYNC_CONNECTION_SERVER = arrivalsNDepartures.token('ISyncConnectionServer');
//# sourceMappingURL=tokens.js.map
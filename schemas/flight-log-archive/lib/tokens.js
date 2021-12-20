import { lib } from '@airport/di';
const flightLogArchive = lib('flight-log-archive');
export const DAILY_SYNC_LOG_DAO = flightLogArchive.token('DAILY_SYNC_LOG_DAO');
export const MONTHLY_SYNC_LOG_DAO = flightLogArchive.token('MONTHLY_SYNC_LOG_DAO');
//# sourceMappingURL=tokens.js.map
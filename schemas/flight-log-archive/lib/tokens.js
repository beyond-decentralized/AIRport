import { system } from '@airport/di';
const flightLogArchive = system('airport').lib('flight-log-archive');
export const DAILY_SYNC_LOG_DAO = flightLogArchive.token();
export const MONTHLY_SYNC_LOG_DAO = flightLogArchive.token();
//# sourceMappingURL=tokens.js.map
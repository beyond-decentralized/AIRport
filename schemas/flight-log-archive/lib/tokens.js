import { system } from '@airport/di';
const flightLogArchive = system('airport').lib('flight-log-archive');
export const DAILY_SYNC_LOG_DAO = flightLogArchive.token('IDailySyncLogDao');
export const MONTHLY_SYNC_LOG_DAO = flightLogArchive.token('IMonthlySyncLogDao');
//# sourceMappingURL=tokens.js.map
import { lib } from '@airport/di'
import {
	IDailySyncLogDao,
	IMonthlySyncLogDao
} from './dao/dao'

const flightLogArchive = lib('flight-log-archive')

export const DAILY_SYNC_LOG_DAO = flightLogArchive.token<IDailySyncLogDao>('DAILY_SYNC_LOG_DAO')
export const MONTHLY_SYNC_LOG_DAO = flightLogArchive.token<IMonthlySyncLogDao>('MONTHLY_SYNC_LOG_DAO')

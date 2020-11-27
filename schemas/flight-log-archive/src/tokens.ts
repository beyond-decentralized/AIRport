import {system} from '@airport/di'
import {
	IDailySyncLogDao,
	IMonthlySyncLogDao
}                from './dao/dao'

const flightLogArchive = system('airport').lib('flight-log-archive')

export const DAILY_SYNC_LOG_DAO   = flightLogArchive.token<IDailySyncLogDao>('IDailySyncLogDao')
export const MONTHLY_SYNC_LOG_DAO = flightLogArchive.token<IMonthlySyncLogDao>('IMonthlySyncLogDao')

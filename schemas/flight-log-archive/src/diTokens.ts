import {diToken} from '@airport/di'
import {
	IDailySyncLogDao,
	IMonthlySyncLogDao
}                from './dao/dao'

export const DAILY_SYNC_LOG_DAO   = diToken<IDailySyncLogDao>()
export const MONTHLY_SYNC_LOG_DAO = diToken<IMonthlySyncLogDao>()
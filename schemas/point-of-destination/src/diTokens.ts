import {diToken}          from '@airport/di'
import {IDailyArchiveDao} from './dao/DailyArchiveDao'

export const DAILY_ARCHIVE_DAO = diToken<IDailyArchiveDao>()
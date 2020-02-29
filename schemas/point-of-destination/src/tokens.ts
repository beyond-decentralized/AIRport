import {system}          from '@airport/di'
import {IDailyArchiveDao} from './dao/DailyArchiveDao'

const pointOfDestination = system('airport').lib('point-of-destination')

export const DAILY_ARCHIVE_DAO = pointOfDestination.token<IDailyArchiveDao>()

import { lib } from '@airport/di'
import { IDailyArchiveDao } from './dao/DailyArchiveDao'

const pointOfDestination = lib('point-of-destination')

export const DAILY_ARCHIVE_DAO = pointOfDestination.token<IDailyArchiveDao>('DAILY_ARCHIVE_DAO')

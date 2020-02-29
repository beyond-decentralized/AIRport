import {AIR_DB}                from '@airport/air-control'
import {container, DI}                    from '@airport/di'
import {DailyArchiveLogValues} from '../../ddl/ddl'
import {DAILY_ARCHIVE_LOG_DAO} from '../../tokens'
import {
	BaseDailyArchiveLogDao,
	Q,
	QDailyArchiveLog
}                              from '../../generated/generated'

export interface IDailyArchiveLogDao {

	insertValues(
		dailyArchiveLogValues: DailyArchiveLogValues[]
	): Promise<number>;

}

export class DailyArchiveLogDao
	extends BaseDailyArchiveLogDao
	implements IDailyArchiveLogDao {

	async insertValues(
		values: DailyArchiveLogValues[]
	): Promise<number> {
		const dbEntity = Q.db.currentVersion.entityMapByName.DailyArchiveLog

		let dal: QDailyArchiveLog

		const airDb = await container(this).get(AIR_DB)

		return await airDb.insertValues(dbEntity, {
			insertInto: dal = Q.DailyArchiveLog,
			columns: [
				dal.repository.id,
				dal.dateNumber,
				dal.numberOfChanges
			],
			values
		})
	}

}

DI.set(DAILY_ARCHIVE_LOG_DAO, DailyArchiveLogDao)

import {DI}                    from '@airport/di'
import {DailyArchiveLogValues} from '../../ddl/ddl'
import {DAILY_ARCHIVE_LOG_DAO} from '../../diTokens'
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

		return await this.airDb.db.insertValues(dbEntity, {
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

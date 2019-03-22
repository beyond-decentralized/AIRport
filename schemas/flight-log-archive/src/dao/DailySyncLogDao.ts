import {
	and,
	distinct
}                            from '@airport/air-control'
import {DI}                  from '@airport/di'
import {
	DailySyncLogDatabaseId,
	DailySyncLogDateNumber,
	DailySyncLogRepositoryId,
	DailySyncLogSynced,
	DailySyncLogValues
}                            from '../ddl/DailySyncLog'
import {DAILY_SYNC_LOG_DAO}  from '../diTokens'
import {BaseDailySyncLogDao} from '../generated/baseDaos'
import {QDailySyncLog}       from '../generated/qdailysynclog'
import {Q}                   from '../generated/qSchema'

export type DailyToMonthlyResult = [
	DailySyncLogDatabaseId,
	DailySyncLogRepositoryId
	];

export interface IDailySyncLogDao {

	insertValues(
		values: DailySyncLogValues[]
	): Promise<void>;

	findAllForDatabase(
		databaseId: DailySyncLogDatabaseId,
		synced: DailySyncLogSynced,
		callback: (
			syncSyncLogRows: [DailySyncLogRepositoryId, DailySyncLogDateNumber][]
		) => void,
	): Promise<void>;

	updateSyncStatus(
		databaseId: DailySyncLogDatabaseId,
		repositoryIds: DailySyncLogRepositoryId[],
		synced: DailySyncLogSynced,
	): Promise<void>;

	findMonthlyResults(
		databaseIds: DailySyncLogDatabaseId[],
		fromDateInclusive: DailySyncLogDateNumber,
		toDateExclusive: DailySyncLogDateNumber
	): Promise<DailyToMonthlyResult[]>;

}

export class DailySyncLogDao
	extends BaseDailySyncLogDao
	implements IDailySyncLogDao {

	async insertValues(
		values: DailySyncLogValues[]
	): Promise<void> {
		const dbEntity = Q.db.currentVersion.entityMapByName.RealtimeSyncLog
		let dsl: QDailySyncLog

		await this.airDb.db.insertValues(dbEntity, {
			insertInto: dsl = Q.DailySyncLog,
			columns: [
				dsl.databaseId,
				dsl.repositoryId,
				// dsl.synced,
				dsl.date
			],
			values
		})
	}

	async findAllForDatabase(
		databaseId: DailySyncLogDatabaseId,
		synced: DailySyncLogSynced,
		callback: (
			syncSyncLogRows: [DailySyncLogRepositoryId, DailySyncLogDateNumber][]
		) => void,
	): Promise<void> {
		let dsl: QDailySyncLog
		await this.airDb.find.sheet({
			from: [
				dsl = Q.DailySyncLog
			],
			select: [
				dsl.repositoryId,
				dsl.date
			],
			where: // and(
				dsl.databaseId.equals(databaseId),
			// dsl.synced.equals(synced)
			// )
		}, 1000, (
			syncSyncLogRows: [DailySyncLogRepositoryId, DailySyncLogDateNumber][]
		) => {
			callback(syncSyncLogRows)
		})
	}

	async updateSyncStatus(
		databaseId: DailySyncLogDatabaseId,
		repositoryIds: DailySyncLogRepositoryId[],
		synced: DailySyncLogSynced,
	): Promise<void> {
		let dsl: QDailySyncLog

		await this.db.updateWhere({
			update: dsl = Q.DailySyncLog,
			set: {
				synced
			},
			where: and(
				dsl.databaseId.equals(databaseId),
				dsl.repositoryId.in(repositoryIds)
			)
		})
	}

	async findMonthlyResults(
		databaseIds: DailySyncLogDatabaseId[],
		fromDateInclusive: DailySyncLogDateNumber,
		toDateExclusive: DailySyncLogDateNumber
	): Promise<DailyToMonthlyResult[]> {
		let dsl: QDailySyncLog

		return <DailyToMonthlyResult[]>await this.airDb.find.sheet({
			from: [
				dsl = Q.DailySyncLog
			],
			select: distinct([
				dsl.databaseId,
				dsl.repositoryId,
				// dsl.synced
			]),
			where: and(
				dsl.databaseId.in(databaseIds),
				dsl.date.greaterThanOrEquals(fromDateInclusive),
				dsl.date.lessThan(toDateExclusive)
			),
			orderBy: [
				dsl.databaseId.asc(),
				dsl.repositoryId.asc()
			]
		})
	}

}

DI.set(DAILY_SYNC_LOG_DAO, DailySyncLogDao)

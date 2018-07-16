import { and, IAirportDatabase, max } from "@airport/air-control";
import { RepositoryId } from "../ddl/repository/Repository";
import { DatabaseSyncLogId } from "../ddl/syncronization/DatabaseSyncLog";
import { DatabaseSyncLogState } from "../ddl/syncronization/DatabaseSyncLogState";
import { InsertSyncLog, SyncLogSyncRecordAddDatetime } from "../ddl/syncronization/SyncLog";
import { SyncRecordId } from "../ddl/syncronization/SyncRecord";
import { DatabaseId } from "../ddl/user/Database";
import { BaseSyncLogDao, IBaseSyncLogDao } from "../generated/baseDaos";
import { Q } from "../generated/qSchema";
import { QDatabaseSyncLog } from "../generated/syncronization/qdatabasesynclog";
import { QSyncLog } from "../generated/syncronization/qsynclog";
import { QSyncRecord } from "../generated/syncronization/qsyncrecord";

export type DbSyncStatus = [DatabaseId, RepositoryId, DatabaseSyncLogState];

export interface ISyncLogDao
	extends IBaseSyncLogDao {

	insertValues(
		values: [DatabaseSyncLogId, SyncRecordId][]
	): Promise<void>;

	selectDbSyncStatusForRepositoryIds(
		fromDateInclusive: SyncLogSyncRecordAddDatetime,
		toDateExlusive: SyncLogSyncRecordAddDatetime,
		repositoryIds: RepositoryId[],
	): Promise<DbSyncStatus[]>;

}

export class SyncLogDao
	extends BaseSyncLogDao
	implements ISyncLogDao {

	constructor(
		private airportDb: IAirportDatabase,
	) {
		super();
	}

	async insertValues(
		values: InsertSyncLog[]
	): Promise<void> {
		const dbEntity = Q.db.entityMapByName.RealtimeSyncLog;
		let sl: QSyncLog;

		await this.airportDb.db.insertValues(dbEntity, {
			insertInto: sl = Q.SyncLog,
			columns: [
				sl.databaseSyncLog.id,
				sl.syncRecord.id,
				sl.syncRecordAddDatetime,
			],
			values
		})
	}

	/**
	 * This query is input into insert of DailySyncLog records.
	 *
	 * Cursor consideration:  ORDER BY and Cursor may not work well together.  Cursor is not
	 * as big of a need here, since the query is limited by repository ids and is only run
	 * by the archival process.
	 *
	 * @param {SyncLogSyncRecordAddDatetime} fromDateInclusive
	 * @param {SyncLogSyncRecordAddDatetime} toDateExlusive
	 * @param {RepositoryId[]} repositoryIds
	 * @returns {Promise<DbSyncStatus[]>}
	 */
	async selectDbSyncStatusForRepositoryIds(
		fromDateInclusive: SyncLogSyncRecordAddDatetime,
		toDateExlusive: SyncLogSyncRecordAddDatetime,
		repositoryIds: RepositoryId[],
	): Promise<DbSyncStatus[]> {
		let sl: QSyncLog, dsl: QDatabaseSyncLog, sr: QSyncRecord;
		return <DbSyncStatus[]>await this.airportDb.find.sheet({
			from: [
				sl = Q.SyncLog,
				dsl = sl.databaseSyncLog.innerJoin(),
				sr = sl.syncRecord.innerJoin()
			],
			select: [
				dsl.database.id,
				sr.repository.id,
				max(dsl.state),
			],
			where: and(
				sl.syncRecordAddDatetime.greaterThanOrEquals(fromDateInclusive),
				sl.syncRecordAddDatetime.lessThan(toDateExlusive),
				sr.addDatetime.greaterThanOrEquals(fromDateInclusive),
				sr.addDatetime.lessThan(toDateExlusive),
				sr.repository.id.isIn(repositoryIds)
			),
			groupBy: [
				dsl.database.id,
				sr.repository.id
			],
			orderBy: [
				sr.repository.id.asc()
			]
		});
	}

}
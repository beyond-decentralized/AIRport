import {
	IDailySyncLogDao,
	InsertDailySyncLog
}                        from '@airport/flight-log-archive'
import {
	ArchiveBatchRecord,
	IServer,
	ISyncLogDao,
	ISyncRecordDao,
	RepositoryId,
	SyncRecordAddDatetime,
	SyncRecordTransactionData
}                        from '@airport/guideway'
import {
	DailyArchive,
	IDailyArchiveDao
}                        from '@airport/point-of-destination'
import {transactional}   from '@airport/tower'
import {MILLIS_IN_DAY}   from '../model/ClientOutMessage'
import {ITuningSettings} from '../model/TuningSettings'


export interface IArchivingServer {

}

/**
 * For best performance Archiving can start on the the Sync Record & Log partitions
 * after they are no longer queries for recent changes - day before yesterday.
 * At that point additional required indexes can be added just to the respective
 * table partitions for that day.  Once the indexes are added then the batch process
 * of extracting and grouping daily data can begin.
 */
export class ArchivingServer
	implements IArchivingServer {

	constructor(
		private dailyArchiveDao: IDailyArchiveDao,
		private dailySyncLogDao: IDailySyncLogDao,
		private server: IServer,
		private syncLogDao: ISyncLogDao,
		private syncRecordDao: ISyncRecordDao,
		private tuningSettings: ITuningSettings,
	) {
	}

	/**
	 * All regular archiving should begin at the beginning of UTC calendar date.
	 * It should archive records on the day prior to the just finished UTC calendar date.
	 * @returns {Promise<void>}
	 */
	async archiveRecordsFromTwoDaysAgo() {
	}

	/**
	 * In case an archiving server went down mid-processing, we should check for older
	 * records, see if they are already in the archive and re-archive them if necessary
	 */
	async checkForAndArchiveStuckRecords() {
	}

	/**
	 * Split up records to be archived into batches.  Archiving Strategy:
	 *
	 * Process records for one repository at a time, aggregate the results
	 * and save the metadata. This should be doable from the original table due
	 * to partitioning.
	 * Perform grouping records by repository to allow for processing by multiple processes:
	 * Add repository Ids into the where clause with a LIMIT of X. Query
	 * performance can then be optimized by db indexing.  And add a flag for the currently
	 * processed records.
	 *
	 * @param {number} onDate
	 * @returns {Promise<void>}
	 */
	async archiveSyncRecords(
		onDate: SyncRecordAddDatetime
	): Promise<void> {
		await transactional(async () => {
			const toDateObject                  = new Date(onDate + MILLIS_IN_DAY + MILLIS_IN_DAY / 2)
			const toDate: SyncRecordAddDatetime = Date.UTC(toDateObject.getUTCFullYear(),
				toDateObject.getUTCMonth(), toDateObject.getUTCDate())

			await this.syncRecordDao.reserveToArchive(
				onDate, toDate, this.server.id,
				this.tuningSettings.archiving.numRepositoriesToProcessAtATime)

			let lastRepositoryId: RepositoryId
			let repositoryIds: RepositoryId[]
			let dailyArchives: DailyArchive[]                           = []
			let dailyRepositorySyncRecords: SyncRecordTransactionData[] = []
			const onDayObject                                           = new Date(onDate)

			await this.syncRecordDao.getAllChangesToArchive(
				onDate, toDate, this.server.id,
				this.tuningSettings.archiving.numSyncRecordsToReturnInCursor, (
					batchData: ArchiveBatchRecord[]
				) => {
					for (const repositoryRecord of batchData) {
						const currentRepositoryId = repositoryRecord[1]
						if (!lastRepositoryId) {
							lastRepositoryId = currentRepositoryId
						}
						const syncRecordTransactionData = repositoryRecord[2]
						if (lastRepositoryId === currentRepositoryId) {
							dailyRepositorySyncRecords.push(syncRecordTransactionData)
						} else {
							dailyArchives.push({
								repositoryId: lastRepositoryId,
								date: onDayObject,
								repositoryData: JSON.stringify(dailyRepositorySyncRecords)
							})
							lastRepositoryId           = currentRepositoryId
							repositoryIds              = []
							dailyRepositorySyncRecords = []
							repositoryIds.push(currentRepositoryId)
							dailyRepositorySyncRecords.push(syncRecordTransactionData)
						}
					}
				})

			if (dailyRepositorySyncRecords.length) {
				dailyArchives.push({
					repositoryId: lastRepositoryId,
					date: onDayObject,
					repositoryData: JSON.stringify(dailyRepositorySyncRecords)
				})
			}

			await this.dailyArchiveDao.addRecords(dailyArchives)
		})
	}

	async archiveSyncLogs(
		onDate: SyncRecordAddDatetime,
		toDateExclusive: SyncRecordAddDatetime,
		repositoryIds: RepositoryId[]
	): Promise<void> {
		const dailyDbSyncStatuses                       = await this.syncLogDao.selectDbSyncStatusForRepositoryIds(
			onDate,
			toDateExclusive,
			repositoryIds
		)
		// const databaseIds:
		const InsertDailySyncLogs: InsertDailySyncLog[] = <InsertDailySyncLog[]>
			dailyDbSyncStatuses.map(
				dailyDbSyncStatus => {
					dailyDbSyncStatus.push(onDate)
					return dailyDbSyncStatus
				})
		await this.dailySyncLogDao.insertValues(InsertDailySyncLogs)
		// await
	}
}

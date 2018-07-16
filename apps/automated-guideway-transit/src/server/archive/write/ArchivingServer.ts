import {AgtRepositoryId} from "@airport/arrivals-n-departures";
import {
	DailySyncLogValues,
	IDailySyncLogDao
}                        from "@airport/flight-log-archive";
import {
	AgtRepositoryTransactionBlockAddDatetime,
	AgtRepositoryTransactionBlockToArchive,
	ArchivingStatus,
	DailyArchiveLogDate,
	DailyArchiveLogValues,
	IAgtRepositoryTransactionBlockDao,
	IDailyArchiveLogDao,
	IServer,
	ISyncLogDao,
	SyncedTerminalRepository
}                        from "@airport/guideway";
import {
	DailyArchiveValues,
	IDailyArchiveDao
}                        from "@airport/point-of-destination";
import {Transactional}   from "@airport/tower";
import {MILLIS_IN_DAY}   from "../../../model/Constaints";
import {ITuningSettings} from "../../../model/TuningSettings";
import {ICloudArchiver}  from "./CloudArchiver";


export interface IArchivingServer {

	archiveRepositoryTransactionBlocks(
		onDate: AgtRepositoryTransactionBlockAddDatetime,
		archiveInTerminal: boolean,
		dateNumber: DailyArchiveLogDate
	): Promise<void>;

}

/**
 * Current approach to archiving previous day's records is to start 12 hours into any given UTC
 * date. Create batches of records for a small groups of Terminals, archive and delete them.
 * Eventually, when crdb implements partitioning we may no longer want to delete the records right
 * away to to delete them after all of archiving for the previous day is done.
 *
 *
 */
export class ArchivingServer
	implements IArchivingServer {

	constructor(
		private cloudArchiver: ICloudArchiver,
		private dailyArchiveDao: IDailyArchiveDao,
		private dailyArchiveLogDao: IDailyArchiveLogDao,
		private dailySyncLogDao: IDailySyncLogDao,
		private server: IServer,
		private syncLogDao: ISyncLogDao,
		private agtRepositoryTransactionBlockDao: IAgtRepositoryTransactionBlockDao,
		private tuningSettings: ITuningSettings,
	) {
	}

	/**
	 * All regular daily archiving should begin some time during th next UTC calendar date.
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
	 * ?Should repositories be grouped by Cloud Account? - can be done as a future optimization.
	 * ?Should db vs cloud archival config be provided by on per repo basis? - future feature
	 *
	 * @param {number} onDate
	 * @returns {Promise<void>}
	 */
	@Transactional()
	async archiveRepositoryTransactionBlocks(
		onDate: AgtRepositoryTransactionBlockAddDatetime,
		archiveInTerminal: boolean,
		dateNumber: DailyArchiveLogDate
	): Promise<void> {
		const toDateObject                                     = new Date(onDate + MILLIS_IN_DAY + MILLIS_IN_DAY / 2);
		const toDate: AgtRepositoryTransactionBlockAddDatetime = Date.UTC(toDateObject.getUTCFullYear(),
			toDateObject.getUTCMonth(), toDateObject.getUTCDate());

		let numRecordsReserved: number;
		while ((numRecordsReserved = await this.agtRepositoryTransactionBlockDao.reserveToArchive(
			onDate, toDate, this.server.id,
			ArchivingStatus.NOT_ARCHIVING,
			this.tuningSettings.archiving.numRepositoriesToProcessAtATime,
		)) > 0) {

			const dailyArchiveValues: DailyArchiveValues[]     = [];
			let dailyArchiveLogValues: DailyArchiveLogValues[] = [];
			let repositoryIds: AgtRepositoryId[]               = [];

			let [repositoryTransactionBlocksToArchive, archivedRepositoryTransactionBlockIds] =
				    await this.agtRepositoryTransactionBlockDao.getAgtRepositoryTransactionBlocksToArchive(
					    onDate, toDate, this.server.id);

			for (const repositoryRecord of repositoryTransactionBlocksToArchive) {
				const currentAgtRepositoryId: AgtRepositoryId = repositoryRecord[0];
				const repositoryTransactionBlocksToArchive: AgtRepositoryTransactionBlockToArchive[]
				                                              = repositoryRecord[1];
				dailyArchiveValues.push([
					currentAgtRepositoryId,
					dateNumber,
					JSON.stringify(repositoryTransactionBlocksToArchive)
				]);
				dailyArchiveLogValues.push([
					currentAgtRepositoryId,
					dateNumber,
					repositoryTransactionBlocksToArchive.length
				]);
				repositoryIds.push(currentAgtRepositoryId);
			}

			if (archiveInTerminal) {
				await this.dailyArchiveDao.addRecords(dailyArchiveValues);
			} else {
				[archivedRepositoryTransactionBlockIds, dailyArchiveLogValues, repositoryIds]
					= await this.cloudArchiver.archive(
					dailyArchiveValues,
					dailyArchiveLogValues,
					onDate
				);
			}

			const syncedTerminalRepositories: SyncedTerminalRepository[] =
				      await this.syncLogDao.selectSyncedTerminalRepositories(
					      onDate,
					      toDate,
					      repositoryIds
				      );

			// Add archive records
			await this.dailyArchiveLogDao.insertValues(dailyArchiveLogValues);
			const dailySyncLogValues: DailySyncLogValues[] = <DailySyncLogValues[]><any>syncedTerminalRepositories;
			dailySyncLogValues.forEach(
				syncLogValues => syncLogValues.push(dateNumber));

			// Add terminal sync records
			await this.dailySyncLogDao.insertValues(dailySyncLogValues);

			// Delete cascades to all related records
			// await this.agtRepositoryTransactionBlockDao.deleteByIds(archivedRepoTransBlockIds);
		}

	}

}
import { ArchivingStatus } from '@airport/guideway';
import { transactional } from '@airport/tower';
import { MILLIS_IN_DAY } from '../../../model/Constaints';
/**
 * Current approach to archiving previous day's records is to start 12 hours into any
 * given UTC date. Create batches of records for a small groups of Terminals, archive and
 * delete them. Eventually, when crdb implements partitioning we may no longer want to
 * delete the records right away to to delete them after all of archiving for the
 * previous day is done.
 *
 *
 */
export class ArchivingServer {
    constructor(cloudArchiver, dailyArchiveDao, dailyArchiveLogDao, dailySyncLogDao, server, syncLogDao, agtRepositoryTransactionBlockDao, tuningSettings) {
        this.cloudArchiver = cloudArchiver;
        this.dailyArchiveDao = dailyArchiveDao;
        this.dailyArchiveLogDao = dailyArchiveLogDao;
        this.dailySyncLogDao = dailySyncLogDao;
        this.server = server;
        this.syncLogDao = syncLogDao;
        this.agtRepositoryTransactionBlockDao = agtRepositoryTransactionBlockDao;
        this.tuningSettings = tuningSettings;
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
     * Perform grouping records by repository to allow for processing by multiple
     * processes:
     * Add repository Ids into the where clause with a LIMIT of X. Query
     * performance can then be optimized by db indexing.  And add a flag for the currently
     * processed records.
     *
     * ?Should repositories be grouped by Cloud Account? - can be done as a future
     * optimization.
     * ?Should db vs cloud archival config be provided by on per repo basis? - future
     * feature
     *
     * @param {number} onDate
     * @returns {Promise<void>}
     */
    async archiveRepositoryTransactionBlocks(onDate, archiveInTerminal, dateNumber) {
        await transactional(async () => {
            const toDateObject = new Date(onDate + MILLIS_IN_DAY + MILLIS_IN_DAY / 2);
            const toDate = Date.UTC(toDateObject.getUTCFullYear(), toDateObject.getUTCMonth(), toDateObject.getUTCDate());
            let numRecordsReserved;
            while ((numRecordsReserved = await this.agtRepositoryTransactionBlockDao.reserveToArchive(onDate, toDate, this.server.id, ArchivingStatus.NOT_ARCHIVING, this.tuningSettings.archiving.numRepositoriesToProcessAtATime)) > 0) {
                const dailyArchiveValues = [];
                let dailyArchiveLogValues = [];
                let repositoryIds = [];
                let [repositoryTransactionBlocksToArchive, archivedRepositoryTransactionBlockIds] = await this.agtRepositoryTransactionBlockDao.getAgtRepositoryTransactionBlocksToArchive(onDate, toDate, this.server.id);
                for (const repositoryRecord of repositoryTransactionBlocksToArchive) {
                    const currentAgtRepositoryId = repositoryRecord[0];
                    const repositoryTransactionBlocksToArchive = repositoryRecord[1];
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
                }
                else {
                    [archivedRepositoryTransactionBlockIds, dailyArchiveLogValues, repositoryIds]
                        = await this.cloudArchiver.archive(dailyArchiveValues, dailyArchiveLogValues, onDate);
                }
                const syncedTerminalRepositories = await this.syncLogDao.selectSyncedTerminalRepositories(onDate, toDate, repositoryIds);
                // Add archive records
                await this.dailyArchiveLogDao.insertValues(dailyArchiveLogValues);
                const dailySyncLogValues = syncedTerminalRepositories;
                dailySyncLogValues.forEach(syncLogValues => syncLogValues.push(dateNumber));
                // Add terminal sync records
                await this.dailySyncLogDao.insertValues(dailySyncLogValues);
                // Delete cascades to all related records
                // await
                // this.agtRepositoryTransactionBlockDao.deleteByIds(archivedRepoTransBlockIds);
            }
        });
    }
}
//# sourceMappingURL=ArchivingServer.js.map
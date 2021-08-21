import { IDailySyncLogDao } from '@airport/flight-log-archive';
import { AgtRepositoryTransactionBlockAddDatetime, DailyArchiveLogDate, IAgtRepositoryTransactionBlockDao, IDailyArchiveLogDao, IServer, ISyncLogDao } from '@airport/guideway';
import { IDailyArchiveDao } from '@airport/point-of-destination';
import { ITuningSettings } from '../../../model/TuningSettings';
import { ICloudArchiver } from './CloudArchiver';
export interface IArchivingServer {
    archiveRepositoryTransactionBlocks(onDate: AgtRepositoryTransactionBlockAddDatetime, archiveInTerminal: boolean, dateNumber: DailyArchiveLogDate): Promise<void>;
}
/**
 * Current approach to archiving previous day's records is to start 12 hours into any
 * given UTC date. Create batches of records for a small groups of Terminals, archive and
 * delete them. Eventually, when crdb implements partitioning we may no longer want to
 * delete the records right away to to delete them after all of archiving for the
 * previous day is done.
 *
 *
 */
export declare class ArchivingServer implements IArchivingServer {
    private cloudArchiver;
    private dailyArchiveDao;
    private dailyArchiveLogDao;
    private dailySyncLogDao;
    private server;
    private syncLogDao;
    private agtRepositoryTransactionBlockDao;
    private tuningSettings;
    constructor(cloudArchiver: ICloudArchiver, dailyArchiveDao: IDailyArchiveDao, dailyArchiveLogDao: IDailyArchiveLogDao, dailySyncLogDao: IDailySyncLogDao, server: IServer, syncLogDao: ISyncLogDao, agtRepositoryTransactionBlockDao: IAgtRepositoryTransactionBlockDao, tuningSettings: ITuningSettings);
    /**
     * All regular daily archiving should begin some time during th next UTC calendar date.
     * It should archive records on the day prior to the just finished UTC calendar date.
     * @returns {Promise<void>}
     */
    archiveRecordsFromTwoDaysAgo(): Promise<void>;
    /**
     * In case an archiving server went down mid-processing, we should check for older
     * records, see if they are already in the archive and re-archive them if necessary
     */
    checkForAndArchiveStuckRecords(): Promise<void>;
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
    archiveRepositoryTransactionBlocks(onDate: AgtRepositoryTransactionBlockAddDatetime, archiveInTerminal: boolean, dateNumber: DailyArchiveLogDate): Promise<void>;
}
//# sourceMappingURL=ArchivingServer.d.ts.map
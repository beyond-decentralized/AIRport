import { AgtRepositoryId, AgtSharingMessageId, TerminalId } from '@airport/arrivals-n-departures';
import { AgtRepositoryTransactionBlockAddDatetime, AgtRepositoryTransactionBlockId, AgtSharingMessageAcknowledged } from '../../ddl/ddl';
import { BaseSyncLogDao, IBaseSyncLogDao } from '../../generated/generated';
export declare type SyncedTerminalRepository = [TerminalId, AgtRepositoryId];
export declare type TerminalSyncStatus = [TerminalId, AgtRepositoryId, AgtSharingMessageAcknowledged];
export declare type InsertSyncLog = [AgtRepositoryTransactionBlockId, AgtSharingMessageId];
export interface ISyncLogDao extends IBaseSyncLogDao {
    insertValues(values: InsertSyncLog[]): Promise<void>;
    selectSyncedTerminalRepositories(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExlusive: AgtRepositoryTransactionBlockAddDatetime, repositoryIds: AgtRepositoryId[]): Promise<SyncedTerminalRepository[]>;
    selectTmSyncStatusForAgtRepositoryIds(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExlusive: AgtRepositoryTransactionBlockAddDatetime, repositoryIds: AgtRepositoryId[]): Promise<TerminalSyncStatus[]>;
}
export declare class SyncLogDao extends BaseSyncLogDao implements ISyncLogDao {
    insertValues(values: InsertSyncLog[]): Promise<void>;
    selectSyncedTerminalRepositories(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExlusive: AgtRepositoryTransactionBlockAddDatetime, repositoryIds: AgtRepositoryId[]): Promise<SyncedTerminalRepository[]>;
    /**
     * This query is input into insert of DailySyncLog records.
     *
     * Cursor consideration:  ORDER BY and Cursor may not work well together.  Cursor is not
     * as big of a need here, since the query is limited by repository ids and is only run
     * by the archival process.
     *
     * @param {AgtAgtRepositoryTransactionBlockAddDatetime} fromDateInclusive
     * @param {AgtAgtRepositoryTransactionBlockAddDatetime} toDateExlusive
     * @param {AgtRepositoryId[]} repositoryIds
     * @returns {Promise<TerminalSyncStatus[]>}
     */
    selectTmSyncStatusForAgtRepositoryIds(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExlusive: AgtRepositoryTransactionBlockAddDatetime, repositoryIds: AgtRepositoryId[]): Promise<TerminalSyncStatus[]>;
}

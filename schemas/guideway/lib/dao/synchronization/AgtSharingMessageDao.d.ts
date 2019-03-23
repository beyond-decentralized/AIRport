import { AgtRepositoryId, AgtSharingMessageId, TerminalId, TmSharingMessageId } from '@airport/arrivals-n-departures';
import { AgtRepositoryTransactionBlockAddDatetime, AgtSharingMessageAcknowledged } from '../../ddl/ddl';
import { BaseAgtSharingMessageDao, IBaseAgtSharingMessageDao } from '../../generated/generated';
export declare type InsertAgtSharingMessage = [TerminalId, TmSharingMessageId, AgtSharingMessageAcknowledged];
export interface IAgtSharingMessageDao extends IBaseAgtSharingMessageDao {
    insertValues(values: InsertAgtSharingMessage[]): Promise<Map<TerminalId, AgtSharingMessageId>>;
    findNotSyncedByIdIn(agtSharingMessageIds: AgtSharingMessageId[]): Promise<Map<TerminalId, Set<AgtSharingMessageId>>>;
    updateToAcked(agtSharingMessageIds: AgtSharingMessageId[]): Promise<void>;
    findIdMapByTerminalIdAndTmSharingMessageId(terminalIds: TerminalId[], tmSharingMessageIds: TmSharingMessageId[]): Promise<Map<TerminalId, Map<TmSharingMessageId, AgtSharingMessageId>>>;
}
export declare class AgtSharingMessageDao extends BaseAgtSharingMessageDao implements IAgtSharingMessageDao {
    insertValues(values: InsertAgtSharingMessage[]): Promise<Map<TerminalId, AgtSharingMessageId>>;
    findNotSyncedByIdIn(agtSharingMessageIds: AgtSharingMessageId[]): Promise<Map<TerminalId, Set<AgtSharingMessageId>>>;
    updateToAcked(agtSharingMessageIds: AgtSharingMessageId[]): Promise<void>;
    findIdMapByTerminalIdAndTmSharingMessageId(terminalIds: TerminalId[], tmSharingMessageIds: TmSharingMessageId[]): Promise<Map<TerminalId, Map<TmSharingMessageId, AgtSharingMessageId>>>;
    /**
     * AgtSharingMessage records are eventually aggregated into DailyAgtSharingMessage
     * records, which represent sync status of a given repository for all records of a
     * given repository on a given day.
     *
     * Terminals always sync to their Shard, and the Shard has all of the records needed by
     * all terminals in that shard.  This is because during sync record creation the Shards
     * owning the repository create those records in all Shards that have terminals
     * pointing
     * to those repositories.  Hence, deleting TerminalSLs never has to cross shard
     * boundaries
     *
     * Deleting AgtSharingMessage records can be done in two ways.  First, it can be done
     * on the bases of TerminalSLs not having any SyncLogs tied to them, this operation
     * would still have to make queries to other nodes to find out which TerminalSL ids are
     * not present.  This is not desired given that SyncLogs will be split be repository
     * ids.
     *
     * A different version of this query is to delete TerminalSLs at the same time as
     * SyncLogs, using foreign key constraints.  This query would provide the repository
     * ids and should be quite a bit faster, given that it should go to targeted nodes for
     * deletion of child SyncLog records.  Additional state management is not required for
     * this version, since the query can also provide explicit SyncLogIds to be deleted as
     * well (in theory).
     *
     * The second option can also only delete only TerminalSLs and leave SyncLogs alone,
     * since they can just be dropped with the daily partition.
     *
     * Both ways can take in TerminalIds, which makes it easy to split the query if the
     * AgtSharingMessage is split between nodes by terminal ids.
     *
     * TODO: inspect query plan
     *
     */
    deleteForAgtRepositoryIdsOnDate(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, terminalIds: TerminalId[], repositoryIds: AgtRepositoryId[]): Promise<void>;
}

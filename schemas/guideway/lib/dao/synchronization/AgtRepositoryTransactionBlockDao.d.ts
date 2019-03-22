import { AgtRepositoryId, RepositoryTransactionBlockContents, RepoTransBlockMessageToTM, TerminalId, TmRepositoryTransactionBlockId } from '@airport/arrivals-n-departures';
import { AgtRepositoryTransactionBlockAddDatetime, AgtRepositoryTransactionBlockArchivingStatus, AgtRepositoryTransactionBlockId, AgtRepositoryTransactionBlockIsRecent, ServerId } from '../../ddl/ddl';
import { BaseAgtRepositoryTransactionBlockDao, IBaseAgtRepositoryTransactionBlockDao } from '../../generated/generated';
export declare type ArchiveBatchRecord = [AgtRepositoryTransactionBlockId, AgtRepositoryId, RepositoryTransactionBlockContents];
export declare type InsertAgtRepositoryTransactionBlock = [AgtRepositoryId, TerminalId, AgtRepositoryTransactionBlockArchivingStatus, AgtRepositoryTransactionBlockAddDatetime, AgtRepositoryTransactionBlockIsRecent, TmRepositoryTransactionBlockId, RepositoryTransactionBlockContents];
export declare type AgtRepositoryTransactionBlockToArchive = [AgtRepositoryTransactionBlockAddDatetime, AgtRepositoryTransactionBlockId, RepositoryTransactionBlockContents];
export declare type RepositoryAgtRepoTransBlocksToArchive = [AgtRepositoryId, AgtRepositoryTransactionBlockToArchive[]];
export declare type AgtRepositoryTransactionBlocksToArchiveResult = [RepositoryAgtRepoTransBlocksToArchive[], AgtRepositoryTransactionBlockId[]];
export declare type NumberOfRTBsReservedToArchive = number;
export interface AugmentedRepoTransBlockMessageToTM extends RepoTransBlockMessageToTM {
    agtRepositoryTransactionBlockId: AgtRepositoryTransactionBlockId;
}
export interface IAgtRepositoryTransactionBlockDao extends IBaseAgtRepositoryTransactionBlockDao {
    findExistingDataIdMap(terminalIds: TerminalId[] | Set<TerminalId>, tmTransactionLogIds: TmRepositoryTransactionBlockId[] | Set<TmRepositoryTransactionBlockId>): Promise<Map<TerminalId, Map<TmRepositoryTransactionBlockId, [AgtRepositoryTransactionBlockId, AgtRepositoryTransactionBlockAddDatetime]>>>;
    insertValues(values: InsertAgtRepositoryTransactionBlock[]): Promise<AgtRepositoryTransactionBlockId[]>;
    getAllAgtRepositoryTransactionBlocksToSend(terminalIds: TerminalId[]): Promise<Map<TerminalId, AugmentedRepoTransBlockMessageToTM[]>>;
    reserveToArchive(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, serverId: ServerId, archivingStatus: AgtRepositoryTransactionBlockArchivingStatus, numRepositoriesToReserve: number): Promise<NumberOfRTBsReservedToArchive>;
    getAgtRepositoryTransactionBlocksToArchive(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, serverId: ServerId): Promise<AgtRepositoryTransactionBlocksToArchiveResult>;
    getAllStuckChangesToArchive(toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, cursorSize: number, callback: (batchData: [AgtRepositoryTransactionBlockId, AgtRepositoryId, AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]) => void): Promise<void>;
    markAllChangesAsArchived(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, repositoryIds: AgtRepositoryId[]): Promise<void>;
    markChangesAsArchived(repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[]): Promise<void>;
    deleteByIds(repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[]): Promise<number>;
}
export declare class AgtRepositoryTransactionBlockDao extends BaseAgtRepositoryTransactionBlockDao implements IAgtRepositoryTransactionBlockDao {
    findExistingDataIdMap(terminalIds: TerminalId[] | Set<TerminalId>, tmTransactionLogIds: TmRepositoryTransactionBlockId[] | Set<TmRepositoryTransactionBlockId>): Promise<Map<TerminalId, Map<TmRepositoryTransactionBlockId, [AgtRepositoryTransactionBlockId, AgtRepositoryTransactionBlockAddDatetime]>>>;
    insertValues(values: InsertAgtRepositoryTransactionBlock[]): Promise<AgtRepositoryTransactionBlockId[]>;
    getAllAgtRepositoryTransactionBlocksToSend(terminalIds: TerminalId[]): Promise<Map<TerminalId, AugmentedRepoTransBlockMessageToTM[]>>;
    getAllUnreadChangesNotExists(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, terminalIds: TerminalId[], isRealtime: AgtRepositoryTransactionBlockIsRecent, cursorSize: number, callback: (batchData: [TerminalId, AgtRepositoryId, AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]) => void): Promise<void>;
    reserveToArchive(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, serverId: ServerId, archivingStatus: AgtRepositoryTransactionBlockArchivingStatus, numRepositoriesToReserve: number): Promise<NumberOfRTBsReservedToArchive>;
    getAgtRepositoryTransactionBlocksToArchive(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, serverId: ServerId): Promise<AgtRepositoryTransactionBlocksToArchiveResult>;
    getAllStuckChangesToArchive(toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, cursorSize: number, callback: (batchData: [AgtRepositoryTransactionBlockId, AgtRepositoryId, AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]) => void): Promise<void>;
    markAllChangesAsArchived(fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime, toDateExclusive: AgtRepositoryTransactionBlockAddDatetime, repositoryIds: AgtRepositoryId[]): Promise<void>;
    markChangesAsArchived(repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[]): Promise<void>;
    deleteByIds(repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[]): Promise<number>;
}

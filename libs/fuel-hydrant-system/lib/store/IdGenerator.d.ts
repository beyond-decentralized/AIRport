import { IAirportDatabase, IUtils } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
import { OperationHistoryId, RecordHistoryId, RepositoryTransactionHistoryId, TransactionHistoryId } from '@airport/holding-pattern';
export declare type NumRepositoryTransHistories = number;
export declare type NumOperationTransHistories = number;
export declare type NumRecordHistories = number;
export interface TransactionHistoryIds {
    operationHistoryIds: OperationHistoryId[];
    recordHistoryIds: RecordHistoryId[];
    repositoryHistoryIds: RepositoryTransactionHistoryId[];
    transactionHistoryId: TransactionHistoryId;
}
export interface IIdGenerator {
    generateTransactionHistoryIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): TransactionHistoryIds;
    generateHoldingPatternEntityId(holdingPatternEntityName: string): number;
    generateEntityId(dbEntity: DbEntity, entity: any): number;
    loadLatestIds(): Promise<void>;
}
/**
 * Created by Papa on 9/2/2016.
 */
export declare class IdGenerator implements IIdGenerator {
    private airportDb;
    private utils;
    private lastIds;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    generateTransactionHistoryIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): TransactionHistoryIds;
    generateTransHistoryId(): number;
    generateRepoTransHistoryId(): number;
    generateOperationHistoryId(): number;
    generateRecordHistoryId(): number;
    generateHoldingPatternEntityId(holdingPatternEntityName: string): number;
    generateEntityId(dbEntity: DbEntity, entity?: any): number;
    /**
     * Ids are tracked on per-Entity basis.  Id's are assigned optimistically can be
     * retroactively updated if sync conflicts arise.  At load time latest ids
     * are loaded into memory and then are maintained in memory for the uptime of the
     * db server.
     * @returns {Promise<void>}
     */
    loadLatestIds(): Promise<void>;
    private generateByHoldingPatternEntityName;
    private getMaxIdQueries;
}

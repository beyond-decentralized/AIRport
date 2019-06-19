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
    init(): Promise<void>;
    generateTransactionHistoryIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): Promise<TransactionHistoryIds>;
}
/**
 * Created by Papa on 9/2/2016.
 */
export declare class IdGenerator implements IIdGenerator {
    private transactionHistoryIdColumns;
    init(): Promise<void>;
    generateTransactionHistoryIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): Promise<TransactionHistoryIds>;
    generateEntityIds(): Promise<void>;
    private getHoldingPatternDbEntity;
}

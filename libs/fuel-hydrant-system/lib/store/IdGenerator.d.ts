import { IAirportDatabase, IUtils } from '@airport/air-control';
import { OperationHistoryId, RecordHistoryId, RepositoryTransactionHistoryId, TransactionHistoryId } from '@airport/holding-pattern';
import { IDomain } from '@airport/territory';
import { ISequenceGenerator } from './VirtualSequenceGenerator';
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
    init(domain: IDomain): Promise<void>;
    generateTransactionHistoryIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): Promise<TransactionHistoryIds>;
}
/**
 * Created by Papa on 9/2/2016.
 */
export declare class IdGenerator implements IIdGenerator {
    private airportDb;
    private sequenceGenerator;
    private utils;
    private transactionHistoryIdColumns;
    constructor(airportDb: IAirportDatabase, sequenceGenerator: ISequenceGenerator, utils: IUtils);
    init(domain: IDomain): Promise<void>;
    generateTransactionHistoryIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): Promise<TransactionHistoryIds>;
    generateEntityIds(): Promise<void>;
    private getHoldingPatternDbEntity;
}

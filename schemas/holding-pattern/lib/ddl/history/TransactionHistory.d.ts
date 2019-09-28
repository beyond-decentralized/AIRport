import { ATransactionHistory, SyncSchemaMap, TransactionType } from '@airport/ground-control';
import { OperationHistory } from './OperationHistory';
import { RecordHistory } from './RecordHistory';
import { RecordHistoryNewValue } from './RecordHistoryNewValue';
import { RecordHistoryOldValue } from './RecordHistoryOldValue';
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory';
export declare type TransactionHistoryNumberOfOperations = number;
/**
 * Created by Papa on 5/1/2017.
 */
export declare type TransactionHistoryId = number;
export declare class TransactionHistory implements ATransactionHistory {
    id: TransactionHistoryId;
    transactionType: TransactionType;
    repositoryTransactionHistories: RepositoryTransactionHistory[];
    repoTransHistoryMap: {
        [repositoryId: number]: RepositoryTransactionHistory;
    };
    schemaMap: SyncSchemaMap;
    allOperationHistory: OperationHistory[];
    allRecordHistory: RecordHistory[];
    allRecordHistoryNewValues: RecordHistoryNewValue[];
    allRecordHistoryOldValues: RecordHistoryOldValue[];
    numberOfOperations: TransactionHistoryNumberOfOperations;
}

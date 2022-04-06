import { ATransactionHistory, SyncApplicationMap, TransactionType } from '@airport/ground-control';
import { IOperationHistory, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue, IRepositoryTransactionHistory } from '../../generated/generated';
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
        [repositoryId: number]: IRepositoryTransactionHistory;
    };
    applicationMap: SyncApplicationMap;
    allOperationHistory: IOperationHistory[];
    allRecordHistory: IRecordHistory[];
    allRecordHistoryNewValues: IRecordHistoryNewValue[];
    allRecordHistoryOldValues: IRecordHistoryOldValue[];
    numberOfOperations: TransactionHistoryNumberOfOperations;
}
//# sourceMappingURL=TransactionHistory.d.ts.map
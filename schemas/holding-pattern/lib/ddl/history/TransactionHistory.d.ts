import { ATransactionHistory, SyncApplicationMap, TransactionType } from '@airport/ground-control';
import { IRecordHistory } from '../../generated/history/recordhistory';
import { IOperationHistory } from '../../generated/history/operationhistory';
import { IRecordHistoryNewValue } from '../../generated/history/recordhistorynewvalue';
import { IRecordHistoryOldValue } from '../../generated/history/recordhistoryoldvalue';
import { IRepositoryTransactionHistory } from '../../generated/history/repositorytransactionhistory';
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory';
export declare type TransactionHistoryNumberOfOperations = number;
/**
 * Created by Papa on 5/1/2017./
 */
export declare type TransactionHistory_LocalId = number;
export declare class TransactionHistory implements ATransactionHistory {
    _localId: TransactionHistory_LocalId;
    transactionType: TransactionType;
    repositoryTransactionHistories: RepositoryTransactionHistory[];
    repositoryTransactionHistoryMap: {
        [repositoryId: number]: IRepositoryTransactionHistory;
    };
    applicationMap: SyncApplicationMap;
    allOperationHistory: IOperationHistory[];
    allRecordHistory: IRecordHistory[];
    allRecordHistoryNewValues: IRecordHistoryNewValue[];
    allRecordHistoryOldValues: IRecordHistoryOldValue[];
}
//# sourceMappingURL=TransactionHistory.d.ts.map
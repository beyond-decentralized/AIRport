import { ATransactionHistory, SyncSchemaMap, TransactionType } from '@airport/ground-control';
import { IOperationHistory } from '../../generated/history/qoperationhistory';
import { IRecordHistory } from '../../generated/history/qrecordhistory';
import { IRecordHistoryNewValue } from '../../generated/history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue } from '../../generated/history/qrecordhistoryoldvalue';
import { IRepositoryTransactionHistory } from '../../generated/history/qrepositorytransactionhistory';
import { ITransactionHistory } from '../../generated/history/qtransactionhistory';
export declare type TransactionHistoryNumberOfOperations = number;
/**
 * Created by Papa on 5/1/2017.
 */
export declare type TransactionHistoryId = number;
export declare class TransactionHistory implements ITransactionHistory, ATransactionHistory {
    id: TransactionHistoryId;
    transactionType: TransactionType;
    repositoryTransactionHistories: IRepositoryTransactionHistory[];
    repoTransHistoryMap: {
        [repositoryId: number]: IRepositoryTransactionHistory;
    };
    schemaMap: SyncSchemaMap;
    allOperationHistory: IOperationHistory[];
    allRecordHistory: IRecordHistory[];
    allRecordHistoryNewValues: IRecordHistoryNewValue[];
    allRecordHistoryOldValues: IRecordHistoryOldValue[];
    numberOfOperations: TransactionHistoryNumberOfOperations;
}

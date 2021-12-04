import { IOperationHistory, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '../../';
import { SyncApplicationMap } from '@airport/ground-control';
import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
export interface ITransactionHistory {
    id: number;
    transactionType?: string;
    repositoryTransactionHistories?: IRepositoryTransactionHistory[];
    repoTransHistoryMap?: {
        [repositoryId: number]: IRepositoryTransactionHistory;
    };
    applicationMap?: SyncApplicationMap;
    allOperationHistory?: IOperationHistory[];
    allRecordHistory?: IRecordHistory[];
    allRecordHistoryNewValues?: IRecordHistoryNewValue[];
    allRecordHistoryOldValues?: IRecordHistoryOldValue[];
    numberOfOperations?: number;
}
//# sourceMappingURL=transactionhistory.d.ts.map
import { SyncApplicationMap } from '@airport/ground-control';
import { IOperationHistory } from './operationhistory';
import { IRecordHistory } from './recordhistory';
import { IRecordHistoryNewValue } from './recordhistorynewvalue';
import { IRecordHistoryOldValue } from './recordhistoryoldvalue';
import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
export interface ITransactionHistory {
    id: number;
    transactionType?: string;
    repositoryTransactionHistories?: IRepositoryTransactionHistory[];
    repositoryTransactionHistoryMap?: {
        [repositoryId: number]: IRepositoryTransactionHistory;
    };
    applicationMap?: SyncApplicationMap;
    allOperationHistory?: IOperationHistory[];
    allRecordHistory?: IRecordHistory[];
    allRecordHistoryNewValues?: IRecordHistoryNewValue[];
    allRecordHistoryOldValues?: IRecordHistoryOldValue[];
}
//# sourceMappingURL=transactionhistory.d.ts.map
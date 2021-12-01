import { IOperationHistory, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '../../';
import { SyncApplicationMap } from '@airport/ground-control';
import { ITerminal } from '@airport/travel-document-checkpoint';
import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
export interface ITransactionHistory {
    id: number;
    transactionType?: string;
    terminal?: ITerminal;
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
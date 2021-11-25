import { RepositoryTransactionHistory } from '../../ddl/history/RepositoryTransactionHistory';
import { SyncSchemaMap } from '@airport/ground-control';
import { OperationHistory } from '../../ddl/history/OperationHistory';
import { RecordHistory } from '../../ddl/history/RecordHistory';
import { RecordHistoryNewValue } from '../../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValue } from '../../ddl/history/RecordHistoryOldValue';
import { ITerminal } from '@airport/travel-document-checkpoint';
import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
export interface ITransactionHistory {
    id: number;
    transactionType?: string;
    terminal?: ITerminal;
    repositoryTransactionHistories?: IRepositoryTransactionHistory[];
    repoTransHistoryMap?: {
        [repositoryId: number]: RepositoryTransactionHistory;
    };
    schemaMap?: SyncSchemaMap;
    allOperationHistory?: OperationHistory[];
    allRecordHistory?: RecordHistory[];
    allRecordHistoryNewValues?: RecordHistoryNewValue[];
    allRecordHistoryOldValues?: RecordHistoryOldValue[];
    numberOfOperations?: number;
}
//# sourceMappingURL=transactionhistory.d.ts.map
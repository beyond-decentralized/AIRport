import { IRepository } from '../repository/repository';
import { ITransactionHistory } from './transactionhistory';
import { IOperationHistory } from './operationhistory';
export interface IRepositoryTransactionHistory {
    _localId: number;
    repositoryTransactionType?: string;
    saveTimestamp?: number;
    syncTimestamp?: number;
    GUID?: string;
    isRepositoryCreation?: boolean;
    repository?: IRepository;
    transactionHistory?: ITransactionHistory;
    operationHistory?: IOperationHistory[];
}
//# sourceMappingURL=repositorytransactionhistory.d.ts.map
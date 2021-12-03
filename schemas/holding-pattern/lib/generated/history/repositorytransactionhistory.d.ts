import { IRepository } from '../repository/repository';
import { IActor } from '../infrastructure/actor';
import { ITransactionHistory } from './transactionhistory';
import { IOperationHistory } from './operationhistory';
export interface IRepositoryTransactionHistory {
    id: number;
    repositoryTransactionType?: string;
    saveTimestamp?: number;
    syncTimestamp?: number;
    uuId?: string;
    isRepositoryCreation?: boolean;
    repository?: IRepository;
    actor?: IActor;
    transactionHistory?: ITransactionHistory;
    operationHistory?: IOperationHistory[];
}
//# sourceMappingURL=repositorytransactionhistory.d.ts.map
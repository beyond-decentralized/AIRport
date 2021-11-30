import { ITransactionHistory } from './transactionhistory';
import { IRepository } from '../repository/repository';
import { IRepoTransHistoryChangedRepositoryActor } from './repotranshistorychangedrepositoryactor';
import { IActor } from '../infrastructure/actor';
import { IOperationHistory } from './operationhistory';
export interface IRepositoryTransactionHistory {
    id: number;
    saveTimestamp?: number;
    repositoryTransactionType?: string;
    synced?: boolean;
    transactionHistory?: ITransactionHistory;
    repository?: IRepository;
    changedRepositoryActors?: IRepoTransHistoryChangedRepositoryActor[];
    actor?: IActor;
    operationHistory?: IOperationHistory[];
}
//# sourceMappingURL=repositorytransactionhistory.d.ts.map
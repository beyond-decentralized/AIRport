import { ITransactionHistory } from './transactionhistory';
import { IRepository } from '../repository/repository';
import { IRepoTransHistoryChangedRepositoryActor } from './repotranshistorychangedrepositoryactor';
import { IActor } from '../infrastructure/actor';
import { IOperationHistory } from './operationhistory';
export interface IRepositoryTransactionHistory {
    id: number;
    remoteId?: number;
    saveTimestamp?: Date;
    repositoryTransactionType?: number;
    blockId?: number;
    transactionHistory?: ITransactionHistory;
    repository?: IRepository;
    changedRepositoryActors?: IRepoTransHistoryChangedRepositoryActor[];
    actor?: IActor;
    operationHistory?: IOperationHistory[];
}

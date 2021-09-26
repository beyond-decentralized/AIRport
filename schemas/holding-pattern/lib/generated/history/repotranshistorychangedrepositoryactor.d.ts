import { IRepositoryTransactionHistory } from './repositorytransactionhistory';
import { IRepository } from '../repository/repository';
import { IActor } from '../infrastructure/actor';
export interface IRepoTransHistoryChangedRepositoryActor {
    id: number;
    referenceType?: string;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    repository?: IRepository;
    actor?: IActor;
}
//# sourceMappingURL=repotranshistorychangedrepositoryactor.d.ts.map
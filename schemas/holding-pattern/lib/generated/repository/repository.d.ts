import { IActor } from '../infrastructure/actor';
import { IRepositoryActor } from './repositoryactor';
import { IRepositoryApplication } from './repositoryapplication';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
export interface IRepository {
    id: number;
    orderedId?: number;
    randomId?: number;
    name?: string;
    url?: string;
    platformConfig?: string;
    syncPriority?: number;
    ownerActor?: IActor;
    repositoryActors?: IRepositoryActor[];
    repositoryApplications?: IRepositoryApplication[];
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
}
//# sourceMappingURL=repository.d.ts.map
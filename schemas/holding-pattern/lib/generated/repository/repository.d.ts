import { IActor } from '../infrastructure/actor';
import { IRepositoryActor } from './repositoryactor';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
export interface IRepository {
    id: number;
    createdAt?: Date;
    uuId?: string;
    name?: string;
    url?: string;
    syncPriority?: string;
    ownerActor?: IActor;
    repositoryActors?: IRepositoryActor[];
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
}
//# sourceMappingURL=repository.d.ts.map
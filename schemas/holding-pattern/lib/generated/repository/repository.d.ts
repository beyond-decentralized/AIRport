import { IActor } from '../infrastructure/actor';
import { IRepositoryActor } from './repositoryactor';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
export interface IRepository {
    id: number;
    createdAt?: Date;
    uuId?: string;
    ageSuitability?: number;
    source?: string;
    immutable?: boolean;
    syncPriority?: string;
    ownerActor?: IActor;
    repositoryActors?: IRepositoryActor[];
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
}
//# sourceMappingURL=repository.d.ts.map
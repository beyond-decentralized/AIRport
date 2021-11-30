import { IActor } from '../infrastructure/actor';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
export interface IRepository {
    id: number;
    ageSuitability?: number;
    createdAt?: Date;
    immutable?: boolean;
    source?: string;
    uuId?: string;
    ownerActor?: IActor;
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
}
//# sourceMappingURL=repository.d.ts.map
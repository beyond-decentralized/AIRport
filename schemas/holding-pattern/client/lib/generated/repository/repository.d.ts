import { IUser } from '@airport/travel-document-checkpoint-runtime';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
export interface IRepository {
    id: number;
    ageSuitability?: number;
    createdAt?: Date;
    immutable?: boolean;
    source?: string;
    uuId?: string;
    owner?: IUser;
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
}
//# sourceMappingURL=repository.d.ts.map
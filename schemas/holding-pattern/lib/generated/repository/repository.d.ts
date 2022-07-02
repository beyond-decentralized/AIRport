import { IUser, IContinent, ICountry, IState, IMetroArea } from '@airport/travel-document-checkpoint';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
export interface IRepository {
    id: number;
    ageSuitability?: number;
    createdAt?: Date;
    immutable?: boolean;
    source?: string;
    GUID?: string;
    owner?: IUser;
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
    continent?: IContinent;
    country?: ICountry;
    state?: IState;
    metroArea?: IMetroArea;
}
//# sourceMappingURL=repository.d.ts.map
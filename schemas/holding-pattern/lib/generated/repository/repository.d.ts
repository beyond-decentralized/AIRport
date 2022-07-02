import { IUser, IContinent, ICountry, IState, IMetroArea } from '@airport/travel-document-checkpoint';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
import { IRepositoryType } from './repositorytype';
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
    repositoryTypes?: IRepositoryType[];
}
//# sourceMappingURL=repository.d.ts.map
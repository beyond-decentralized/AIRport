import { IUserAccount, IContinent, ICountry, IState, IMetroArea } from '@airport/travel-document-checkpoint';
import { IRepositoryTransactionHistory } from '../history/repositorytransactionhistory';
import { IRepositoryApplication } from './repositoryapplication';
import { IRepositoryClient } from './repositoryclient';
import { IRepositoryDatabase } from './repositorydatabase';
import { IRepositoryTerminal } from './repositoryterminal';
import { IRepositoryType } from './repositorytype';
export interface IRepository {
    _localId: number;
    GUID?: string;
    name?: string;
    ageSuitability?: number;
    createdAt?: Date;
    immutable?: boolean;
    source?: string;
    owner?: IUserAccount;
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
    continent?: IContinent;
    country?: ICountry;
    state?: IState;
    metroArea?: IMetroArea;
    repositoryApplications?: IRepositoryApplication[];
    repositoryClients?: IRepositoryClient[];
    repositoryDatabases?: IRepositoryDatabase[];
    repositoryTerminals?: IRepositoryTerminal[];
    repositoryTypes?: IRepositoryType[];
}
//# sourceMappingURL=repository.d.ts.map
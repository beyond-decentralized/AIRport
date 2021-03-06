import { IEntityVDescriptor, IVBooleanField, IVDateField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { UserAccountVDescriptor, UserAccount, ContinentVDescriptor, Continent, CountryVDescriptor, Country, StateVDescriptor, State, MetroAreaVDescriptor, MetroArea } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import { RepositoryTransactionHistoryVDescriptor } from '../history/vrepositorytransactionhistory';
import { RepositoryTransactionHistory } from '../../ddl/history/RepositoryTransactionHistory';
import { RepositoryApplicationVDescriptor } from './vrepositoryapplication';
import { RepositoryApplication } from '../../ddl/repository/RepositoryApplication';
import { RepositoryClientVDescriptor } from './vrepositoryclient';
import { RepositoryClient } from '../../ddl/repository/RepositoryClient';
import { RepositoryDatabaseVDescriptor } from './vrepositorydatabase';
import { RepositoryDatabase } from '../../ddl/repository/RepositoryDatabase';
import { RepositoryTerminalVDescriptor } from './vrepositoryterminal';
import { RepositoryTerminal } from '../../ddl/repository/RepositoryTerminal';
import { RepositoryTypeVDescriptor } from './vrepositorytype';
import { RepositoryType } from '../../ddl/repository/RepositoryType';
export interface RepositoryVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    GUID?: string | IVStringField;
    ageSuitability?: number | IVNumberField;
    createdAt?: Date | IVDateField;
    immutable?: boolean | IVBooleanField;
    source?: string | IVStringField;
    owner?: UserAccountVDescriptor<UserAccount>;
    repositoryTransactionHistory?: RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>;
    continent?: ContinentVDescriptor<Continent>;
    country?: CountryVDescriptor<Country>;
    state?: StateVDescriptor<State>;
    metroArea?: MetroAreaVDescriptor<MetroArea>;
    repositoryApplications?: RepositoryApplicationVDescriptor<RepositoryApplication>;
    repositoryClients?: RepositoryClientVDescriptor<RepositoryClient>;
    repositoryDatabases?: RepositoryDatabaseVDescriptor<RepositoryDatabase>;
    repositoryTerminals?: RepositoryTerminalVDescriptor<RepositoryTerminal>;
    repositoryTypes?: RepositoryTypeVDescriptor<RepositoryType>;
}
//# sourceMappingURL=vrepository.d.ts.map
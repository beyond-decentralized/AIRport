import { IEntityVDescriptor, IVBooleanField, IVDateField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { UserAccountVDescriptor, ContinentVDescriptor, CountryVDescriptor, StateVDescriptor, MetroAreaVDescriptor } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import { RepositoryTransactionHistoryVDescriptor } from '../history/vrepositorytransactionhistory';
import { RepositoryApplicationVDescriptor } from './vrepositoryapplication';
import { RepositoryClientVDescriptor } from './vrepositoryclient';
import { RepositoryDatabaseVDescriptor } from './vrepositorydatabase';
import { RepositoryTerminalVDescriptor } from './vrepositoryterminal';
import { RepositoryTypeVDescriptor } from './vrepositorytype';
export interface RepositoryVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    GUID?: string | IVStringField;
    ageSuitability?: number | IVNumberField;
    createdAt?: Date | IVDateField;
    immutable?: boolean | IVBooleanField;
    source?: string | IVStringField;
    owner?: UserAccountVDescriptor;
    repositoryTransactionHistory?: RepositoryTransactionHistoryVDescriptor;
    continent?: ContinentVDescriptor;
    country?: CountryVDescriptor;
    state?: StateVDescriptor;
    metroArea?: MetroAreaVDescriptor;
    repositoryApplications?: RepositoryApplicationVDescriptor;
    repositoryClients?: RepositoryClientVDescriptor;
    repositoryDatabases?: RepositoryDatabaseVDescriptor;
    repositoryTerminals?: RepositoryTerminalVDescriptor;
    repositoryTypes?: RepositoryTypeVDescriptor;
}
//# sourceMappingURL=vrepository.d.ts.map
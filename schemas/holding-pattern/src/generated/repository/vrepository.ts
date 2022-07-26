import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	UserAccountVDescriptor,
	IUserAccount,
	ContinentVDescriptor,
	IContinent,
	CountryVDescriptor,
	ICountry,
	StateVDescriptor,
	IState,
	MetroAreaVDescriptor,
	IMetroArea,
} from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import {
	RepositoryTransactionHistoryVDescriptor,
} from '../history/vrepositorytransactionhistory';
import {
	IRepositoryTransactionHistory,
} from '../history/repositorytransactionhistory';
import {
	RepositoryApplicationVDescriptor,
} from './vrepositoryapplication';
import {
	IRepositoryApplication,
} from './repositoryapplication';
import {
	RepositoryClientVDescriptor,
} from './vrepositoryclient';
import {
	IRepositoryClient,
} from './repositoryclient';
import {
	RepositoryDatabaseVDescriptor,
} from './vrepositorydatabase';
import {
	IRepositoryDatabase,
} from './repositorydatabase';
import {
	RepositoryTerminalVDescriptor,
} from './vrepositoryterminal';
import {
	IRepositoryTerminal,
} from './repositoryterminal';
import {
	RepositoryTypeVDescriptor,
} from './vrepositorytype';
import {
	IRepositoryType,
} from './repositorytype';
import {
	IRepository,
} from './repository';



////////////////////
//  API INTERFACE //
////////////////////

export interface RepositoryVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	GUID?: string | IVStringField;
	ageSuitability?: number | IVNumberField;
	createdAt?: Date | IVDateField;
	immutable?: boolean | IVBooleanField;
	source?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
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



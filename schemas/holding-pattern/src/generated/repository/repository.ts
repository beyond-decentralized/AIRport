import {
	IUserAccount,
	IContinent,
	ICountry,
	IState,
	IMetroArea,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryTransactionHistory,
} from '../history/repositorytransactionhistory';
import {
	IRepositoryApplication,
} from './repositoryapplication';
import {
	IRepositoryClient,
} from './repositoryclient';
import {
	IRepositoryDatabase,
} from './repositorydatabase';
import {
	IRepositoryTerminal,
} from './repositoryterminal';
import {
	IRepositoryType,
} from './repositorytype';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepository {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;
	name?: string;
	ageSuitability?: number;
	createdAt?: Date;
	immutable?: boolean;
	source?: string;

	// Non-Id Relations
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

	// Transient Properties

	// Public Methods
	
}



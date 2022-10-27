import {
	IUserAccount,
	IContinent,
	ICountry,
	IState,
	IMetroArea,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryTransactionHistory,
} from '../history/IRepositoryTransactionHistory';
import {
	IRepositoryApplication,
} from './IRepositoryApplication';
import {
	IRepositoryClient,
} from './IRepositoryClient';
import {
	IRepositoryDatabase,
} from './IRepositoryDatabase';
import {
	IRepositoryTerminal,
} from './IRepositoryTerminal';
import {
	IRepositoryType,
} from './IRepositoryType';



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
	fullApplicationName?: string;

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



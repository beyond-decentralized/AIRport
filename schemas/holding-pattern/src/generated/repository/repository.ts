import {
	IUser,
	IContinent,
	ICountry,
	IState,
	IMetroArea,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryTransactionHistory,
} from '../history/repositorytransactionhistory';
import {
	IRepositoryType,
} from './repositorytype';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepository {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	ageSuitability?: number;
	createdAt?: Date;
	immutable?: boolean;
	source?: string;
	GUID?: string;

	// Non-Id Relations
	owner?: IUser;
	repositoryTransactionHistory?: IRepositoryTransactionHistory[];
	continent?: IContinent;
	country?: ICountry;
	state?: IState;
	metroArea?: IMetroArea;
	repositoryTypes?: IRepositoryType[];

	// Transient Properties

	// Public Methods
	
}



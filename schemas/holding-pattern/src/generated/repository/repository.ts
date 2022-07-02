import {
	IUser,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryTransactionHistory,
} from '../history/repositorytransactionhistory';



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

	// Transient Properties

	// Public Methods
	
}



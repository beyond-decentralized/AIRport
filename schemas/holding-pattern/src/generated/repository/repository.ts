import {
	IActor,
} from '../infrastructure/actor';
import {
	IRepositoryActor,
} from './repositoryactor';
import {
	IRepositoryApplication,
} from './repositoryapplication';
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
	orderedId?: number;
	randomId?: number;
	name?: string;
	url?: string;
	platformConfig?: string;
	syncPriority?: number;

	// Non-Id Relations
	ownerActor?: IActor;
	repositoryActors?: IRepositoryActor[];
	repositoryApplications?: IRepositoryApplication[];
	repositoryTransactionHistory?: IRepositoryTransactionHistory[];

	// Transient Properties

	// Public Methods
	
}



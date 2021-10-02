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
	createdAt?: Date;
	uuId?: string;
	name?: string;
	url?: string;
	platformConfig?: string;
	syncPriority?: string;

	// Non-Id Relations
	ownerActor?: IActor;
	repositoryActors?: IRepositoryActor[];
	repositoryApplications?: IRepositoryApplication[];
	repositoryTransactionHistory?: IRepositoryTransactionHistory[];

	// Transient Properties

	// Public Methods
	
}



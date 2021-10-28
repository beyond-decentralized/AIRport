import {
	IActor,
} from '../infrastructure/actor';
import {
	IRepositoryActor,
} from './repositoryactor';
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
	ageSuitability?: number;
	url?: string;
	syncPriority?: string;

	// Non-Id Relations
	ownerActor?: IActor;
	repositoryActors?: IRepositoryActor[];
	repositoryTransactionHistory?: IRepositoryTransactionHistory[];

	// Transient Properties

	// Public Methods
	
}



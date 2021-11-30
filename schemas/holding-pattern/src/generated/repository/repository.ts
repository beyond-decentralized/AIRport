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
	ageSuitability?: number;
	source?: string;
	immutable?: boolean;

	// Non-Id Relations
	ownerActor?: IActor;
	repositoryActors?: IRepositoryActor[];
	repositoryTransactionHistory?: IRepositoryTransactionHistory[];

	// Transient Properties

	// Public Methods
	
}



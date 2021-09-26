import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';
import {
	IRepository,
} from '../repository/repository';
import {
	IActor,
} from '../infrastructure/actor';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepoTransHistoryChangedRepositoryActor {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	referenceType?: string;

	// Non-Id Relations
	repositoryTransactionHistory?: IRepositoryTransactionHistory;
	repository?: IRepository;
	actor?: IActor;

	// Transient Properties

	// Public Methods
	
}



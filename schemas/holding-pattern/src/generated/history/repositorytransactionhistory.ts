import {
	ITransactionHistory,
} from './transactionhistory';
import {
	IRepository,
} from '../repository/repository';
import {
	IRepoTransHistoryChangedRepositoryActor,
} from './repotranshistorychangedrepositoryactor';
import {
	IActor,
} from '../infrastructure/actor';
import {
	IOperationHistory,
} from './operationhistory';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryTransactionHistory {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	remoteId?: number;
	saveTimestamp?: Date;
	repositoryTransactionType?: number;
	blockId?: number;

	// Non-Id Relations
	transactionHistory?: ITransactionHistory;
	repository?: IRepository;
	changedRepositoryActors?: IRepoTransHistoryChangedRepositoryActor[];
	actor?: IActor;
	operationHistory?: IOperationHistory[];

	// Transient Properties

	// Public Methods
	
}



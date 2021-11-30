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
	saveTimestamp?: number;
	repositoryTransactionType?: string;
	synced?: boolean;

	// Non-Id Relations
	transactionHistory?: ITransactionHistory;
	repository?: IRepository;
	changedRepositoryActors?: IRepoTransHistoryChangedRepositoryActor[];
	actor?: IActor;
	operationHistory?: IOperationHistory[];

	// Transient Properties

	// Public Methods
	
}



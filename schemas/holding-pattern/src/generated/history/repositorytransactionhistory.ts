import {
	IRepository,
} from '../repository/repository';
import {
	IActor,
} from '../infrastructure/actor';
import {
	ITransactionHistory,
} from './transactionhistory';
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
	repositoryTransactionType?: string;
	saveTimestamp?: number;
	syncTimestamp?: number;
	uuId?: string;
	isRepositoryCreation?: boolean;

	// Non-Id Relations
	repository?: IRepository;
	actor?: IActor;
	transactionHistory?: ITransactionHistory;
	operationHistory?: IOperationHistory[];

	// Transient Properties

	// Public Methods
	
}



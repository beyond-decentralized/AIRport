import {
	IRepository,
} from '../repository/repository';
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
	_localId: number;

	// Id Relations

	// Non-Id Properties
	repositoryTransactionType?: string;
	saveTimestamp?: number;
	syncTimestamp?: number;
	GUID?: string;
	isRepositoryCreation?: boolean;

	// Non-Id Relations
	repository?: IRepository;
	transactionHistory?: ITransactionHistory;
	operationHistory?: IOperationHistory[];

	// Transient Properties

	// Public Methods
	
}



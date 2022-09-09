import {
	IRepository,
} from '../repository/IRepository';
import {
	ITransactionHistory,
} from './ITransactionHistory';
import {
	IOperationHistory,
} from './IOperationHistory';



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



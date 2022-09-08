import {
	IRepository,
} from '../repository/Repository';
import {
	ITransactionHistory,
} from './TransactionHistory';
import {
	IOperationHistory,
} from './OperationHistory';



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



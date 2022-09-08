import {
	IApplicationEntity,
} from '@airport/airspace';
import {
	IActor,
} from '../infrastructure/Actor';
import {
	IRepositoryTransactionHistory,
} from './RepositoryTransactionHistory';
import {
	IRecordHistory,
} from './RecordHistory';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IOperationHistory {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	orderNumber?: number;
	changeType?: string;
	systemWideOperationId?: number;

	// Non-Id Relations
	entity?: IApplicationEntity;
	actor?: IActor;
	repositoryTransactionHistory?: IRepositoryTransactionHistory;
	recordHistory?: IRecordHistory[];

	// Transient Properties

	// Public Methods
	
}



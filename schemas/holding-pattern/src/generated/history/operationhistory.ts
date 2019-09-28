import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';
import {
	ISchemaEntity,
} from '@airport/traffic-pattern';
import {
	IRecordHistory,
} from './recordhistory';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IOperationHistory {
	
	// Id Properties
	id: number;

	// Id Relations
	repositoryTransactionHistory: IRepositoryTransactionHistory;

	// Non-Id Properties
	orderNumber?: number;
	changeType?: number;
	systemWideOperationId?: number;

	// Non-Id Relations
	entity?: ISchemaEntity;
	recordHistory?: IRecordHistory[];

	// Transient Properties

	// Public Methods
	
}



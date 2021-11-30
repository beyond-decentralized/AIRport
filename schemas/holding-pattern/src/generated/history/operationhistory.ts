import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';
import {
	ISchemaEntity,
} from '@airport/airspace';
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

	// Non-Id Properties
	orderNumber?: number;
	changeType?: string;
	systemWideOperationId?: number;

	// Non-Id Relations
	repositoryTransactionHistory?: IRepositoryTransactionHistory;
	entity?: ISchemaEntity;
	recordHistory?: IRecordHistory[];

	// Transient Properties

	// Public Methods
	
}



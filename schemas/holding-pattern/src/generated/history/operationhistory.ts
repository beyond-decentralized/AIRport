import {
	ISchemaEntity,
} from '@airport/airspace';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';
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
	entity?: ISchemaEntity;
	repositoryTransactionHistory?: IRepositoryTransactionHistory;
	recordHistory?: IRecordHistory[];

	// Transient Properties

	// Public Methods
	
}



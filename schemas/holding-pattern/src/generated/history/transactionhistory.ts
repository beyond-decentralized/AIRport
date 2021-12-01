import {
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRecordHistoryOldValue,
} from '../../';
import {
	SyncSchemaMap,
} from '@airport/ground-control';
import {
	ITerminal,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITransactionHistory {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	transactionType?: string;

	// Non-Id Relations
	terminal?: ITerminal;
	repositoryTransactionHistories?: IRepositoryTransactionHistory[];

	// Transient Properties
	repoTransHistoryMap?: { [repositoryId: number]: IRepositoryTransactionHistory};
	schemaMap?: SyncSchemaMap;
	allOperationHistory?: IOperationHistory[];
	allRecordHistory?: IRecordHistory[];
	allRecordHistoryNewValues?: IRecordHistoryNewValue[];
	allRecordHistoryOldValues?: IRecordHistoryOldValue[];
	numberOfOperations?: number;

	// Public Methods
	
}



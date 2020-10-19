import {
	RepositoryTransactionHistory,
} from '../../ddl/history/RepositoryTransactionHistory';
import {
	SyncSchemaMap,
} from '@airport/ground-control';
import {
	OperationHistory,
} from '../../ddl/history/OperationHistory';
import {
	RecordHistory,
} from '../../ddl/history/RecordHistory';
import {
	RecordHistoryNewValue,
} from '../../ddl/history/RecordHistoryNewValue';
import {
	RecordHistoryOldValue,
} from '../../ddl/history/RecordHistoryOldValue';
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
	transactionType?: number;

	// Non-Id Relations
	repositoryTransactionHistories?: IRepositoryTransactionHistory[];

	// Transient Properties
	repoTransHistoryMap?: { [repositoryId: number]: RepositoryTransactionHistory; };
	schemaMap?: SyncSchemaMap;
	allOperationHistory?: OperationHistory[];
	allRecordHistory?: RecordHistory[];
	allRecordHistoryNewValues?: RecordHistoryNewValue[];
	allRecordHistoryOldValues?: RecordHistoryOldValue[];
	numberOfOperations?: number;

	// Public Methods
	
}



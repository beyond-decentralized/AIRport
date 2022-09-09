import {
	SyncApplicationMap,
} from '@airport/ground-control';
import {
	IOperationHistory,
} from './IOperationHistory';
import {
	IRecordHistory,
} from './IRecordHistory';
import {
	IRecordHistoryNewValue,
} from './IRecordHistoryNewValue';
import {
	IRecordHistoryOldValue,
} from './IRecordHistoryOldValue';
import {
	IRepositoryTransactionHistory,
} from './IRepositoryTransactionHistory';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITransactionHistory {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	transactionType?: string;

	// Non-Id Relations
	repositoryTransactionHistories?: IRepositoryTransactionHistory[];

	// Transient Properties
	repositoryTransactionHistoryMap?: { [repositoryId: number]: IRepositoryTransactionHistory; };
	applicationMap?: SyncApplicationMap;
	allOperationHistory?: IOperationHistory[];
	allRecordHistory?: IRecordHistory[];
	allRecordHistoryNewValues?: IRecordHistoryNewValue[];
	allRecordHistoryOldValues?: IRecordHistoryOldValue[];

	// Public Methods
	
}



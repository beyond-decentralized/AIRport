import {
	SyncApplicationMap,
} from '@airport/ground-control';
import {
	IOperationHistory,
} from './operationhistory';
import {
	IRecordHistory,
} from './recordhistory';
import {
	IRecordHistoryNewValue,
} from './recordhistorynewvalue';
import {
	IRecordHistoryOldValue,
} from './recordhistoryoldvalue';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';



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



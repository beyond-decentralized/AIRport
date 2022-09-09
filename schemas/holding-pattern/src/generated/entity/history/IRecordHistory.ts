import {
	SyncColumnMap,
} from '@airport/ground-control';
import {
	IActor,
} from '../infrastructure/IActor';
import {
	IOperationHistory,
} from './IOperationHistory';
import {
	IRecordHistoryNewValue,
} from './IRecordHistoryNewValue';
import {
	IRecordHistoryOldValue,
} from './IRecordHistoryOldValue';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordHistory {
	
	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	_actorRecordId?: number;

	// Non-Id Relations
	actor?: IActor;
	operationHistory?: IOperationHistory;
	newValues?: IRecordHistoryNewValue[];
	oldValues?: IRecordHistoryOldValue[];

	// Transient Properties
	tableColumnMap?: SyncColumnMap;

	// Public Methods
	
}



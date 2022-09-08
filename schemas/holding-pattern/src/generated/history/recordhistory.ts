import {
	SyncColumnMap,
} from '@airport/ground-control';
import {
	IActor,
} from '../infrastructure/Actor';
import {
	IOperationHistory,
} from './OperationHistory';
import {
	IRecordHistoryNewValue,
} from './RecordHistoryNewValue';
import {
	IRecordHistoryOldValue,
} from './RecordHistoryOldValue';



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


